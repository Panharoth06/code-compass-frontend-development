// lib/auth/next-auth-options.ts
import { logoutRequest, refreshTokenRequest } from "./oidc";
import type { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// Validate required environment variables at startup
const validateEnvironmentVariables = () => {
  const requiredVars = {
    OIDC_CLIENT_ID: process.env.OIDC_CLIENT_ID,
    OIDC_CLIENT_SECRET: process.env.OIDC_CLIENT_SECRET,
    OIDC_ISSUER: process.env.OIDC_ISSUER,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  };

  const missing = Object.entries(requiredVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  return requiredVars as Record<keyof typeof requiredVars, string>;
};

// Constants for token management
const TOKEN_CONFIG = {
  DEFAULT_EXPIRES_IN: 180, // 3 minutes in seconds
  REFRESH_BUFFER_TIME: 30, // 30-second buffer before expiration
  JWT_MAX_AGE: 60 * 4, // 4 minutes - slightly longer than token expiration
  MAX_REFRESH_RETRIES: 2,
  // HTTP timeout configurations
  HTTP_TIMEOUT: 10000, // 10 seconds
  RETRY_DELAY_MS: 2000, // 2 seconds base delay
} as const;

// Initialize environment variables
const env = validateEnvironmentVariables();

// Enhanced HTTP client with timeout and retry logic
const createHttpClient = () => {
  return {
    async fetch(url: string, options: RequestInit = {}): Promise<Response> {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        TOKEN_CONFIG.HTTP_TIMEOUT
      );

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "NextAuth.js",
            ...options.headers,
          },
        });
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        clearTimeout(timeoutId);
        if (error instanceof Error && error.name === "AbortError") {
          throw new Error(
            `Request timeout after ${TOKEN_CONFIG.HTTP_TIMEOUT}ms`
          );
        }
        throw error;
      }
    },
  };
};

const httpClient = createHttpClient();

// Utility function for safe token refresh with retries
const safeRefreshToken = async (
  refreshToken: string | undefined,
  retryCount: number = 0
): Promise<{
  access_token: string;
  refresh_token?: string;
  expires_in: number;
} | null> => {
  if (!refreshToken || typeof refreshToken !== "string") {
    console.error("Invalid refresh token provided");
    return null;
  }

  try {
    const refreshed = await refreshTokenRequest(refreshToken);

    // Validate the refresh response
    if (!refreshed?.access_token) {
      console.error("Invalid refresh token response: missing access_token");
      return null;
    }

    return refreshed;
  } catch (error) {
    console.error(`Token refresh attempt ${retryCount + 1} failed:`, error);

    // Retry logic for transient failures
    if (retryCount < TOKEN_CONFIG.MAX_REFRESH_RETRIES) {
      console.info(
        `Retrying token refresh (${retryCount + 1}/${
          TOKEN_CONFIG.MAX_REFRESH_RETRIES
        })`
      );
      await new Promise((resolve) =>
        setTimeout(resolve, TOKEN_CONFIG.RETRY_DELAY_MS * (retryCount + 1))
      ); // Exponential backoff
      return safeRefreshToken(refreshToken, retryCount + 1);
    }

    return null;
  }
};

// Utility function to check if token needs refresh
const shouldRefreshToken = (expiresAt: number): boolean => {
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime >= expiresAt - TOKEN_CONFIG.REFRESH_BUFFER_TIME;
};

// Utility function to calculate expiration time
const calculateExpiresAt = (expiresIn?: string | number): number => {
  const currentTime = Math.floor(Date.now() / 1000);
  const expirationSeconds = expiresIn
    ? typeof expiresIn === "string"
      ? parseInt(expiresIn, 10)
      : expiresIn
    : TOKEN_CONFIG.DEFAULT_EXPIRES_IN;

  return currentTime + Math.max(expirationSeconds, 60); // Minimum 1 minute
};

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: env.OIDC_CLIENT_ID,
      clientSecret: env.OIDC_CLIENT_SECRET,
      issuer: env.OIDC_ISSUER,
      // Add timeout configurations for Keycloak
      httpOptions: {
        timeout: TOKEN_CONFIG.HTTP_TIMEOUT,
      },
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      // GitHub specific configurations
      httpOptions: {
        timeout: TOKEN_CONFIG.HTTP_TIMEOUT,
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      // Google specific configurations
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      httpOptions: {
        timeout: TOKEN_CONFIG.HTTP_TIMEOUT,
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, trigger, session }) {
      try {
        // Initial sign in - store tokens from account
        if (account?.access_token) {
          console.info("Initial sign in - storing new tokens", {
            provider: account.provider,
          });
          return {
            ...token,
            provider: account.provider,
            access_token: account.access_token,
            refresh_token: account.refresh_token || token.refresh_token,
            expires_at: calculateExpiresAt(account.expires_at),
            error: undefined, // Clear any previous errors
          };
        }

        // Handle forced refresh triggers
        if (trigger === "update" && session?.forceRefresh) {
          console.info("Forced token refresh requested");
          const refreshed = await safeRefreshToken(token.refresh_token);

          if (refreshed) {
            return {
              ...token,
              access_token: refreshed.access_token,
              refresh_token: refreshed.refresh_token || token.refresh_token,
              expires_at: calculateExpiresAt(refreshed.expires_in),
              error: undefined,
            };
          } else {
            console.error("Forced token refresh failed");
            return { ...token, error: "RefreshAccessTokenError" };
          }
        }

        // Skip refresh if token has error or is missing required fields
        if (token.error || !token.access_token || !token.expires_at) {
          console.warn(
            "Token has error or missing required fields, skipping refresh"
          );
          return token;
        }

        // Check if token needs refresh (only for providers that support refresh tokens)
        if (
          token.refresh_token &&
          shouldRefreshToken(token.expires_at as number)
        ) {
          console.info("Token expired or expiring soon, attempting refresh");

          const refreshed = await safeRefreshToken(token.refresh_token);

          if (refreshed) {
            console.info("Token refresh successful");
            return {
              ...token,
              access_token: refreshed.access_token,
              refresh_token: refreshed.refresh_token || token.refresh_token,
              expires_at: calculateExpiresAt(refreshed.expires_in),
              error: undefined,
            };
          } else {
            console.error("Token refresh failed - marking token as errored");
            return { ...token, error: "RefreshAccessTokenError" };
          }
        }

        // Token is still valid
        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        return { ...token, error: "JWTError" };
      }
    },

    async session({ session, token }) {
      try {
        // Only attach tokens if they exist and are valid
        if (token.access_token && !token.error) {
          session.access_token = token.access_token as string;
          session.refresh_token = token.refresh_token as string;
          session.expires_at = token.expires_at as number;
          session.provider = token.provider as string;
          session.error = undefined;
        } else {
          // Handle error state
          session.error = (token.error as string) || "TokenError";
          console.warn("Session created with token error:", session.error);
        }

        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return { ...session, error: "SessionError" };
      }
    },

    async redirect({ url, baseUrl }) {
      console.log("NextAuth redirect called:", { url, baseUrl });

      // Handle relative URLs
      if (url.startsWith("/")) {
        const fullUrl = `${baseUrl}${url}`;
        console.log("Handling relative URL:", fullUrl);
        return fullUrl;
      }

      // Handle same origin URLs
      try {
        const urlObj = new URL(url);
        if (urlObj.origin === baseUrl) {
          console.log("Allowing same origin URL:", url);
          return url;
        }
      } catch (error) {
        console.error("Error parsing URL:", error);
      }

      // Special handling for OAuth callbacks
      // After successful OAuth, redirect to your custom callback handler
      if (url === baseUrl || url === `${baseUrl}/`) {
        const callbackUrl = `${baseUrl}/oauth-callback`;
        console.log(
          "Default redirect - sending to OAuth callback:",
          callbackUrl
        );
        return callbackUrl;
      }

      // Fallback to base URL
      console.log("Fallback to baseUrl:", baseUrl);
      return baseUrl;
    },

    async signIn({ user, account, profile, email, credentials }) {
      try {
        console.info("Sign in attempt:", {
          userId: user.id,
          email: user.email,
          provider: account?.provider,
          profileId: profile?.sub || profile?.image,
        });

        // Allow all sign-ins by default
        // Add custom logic here if needed (e.g., domain restrictions)
        return true;
      } catch (error) {
        console.error("Sign in callback error:", error);
        return false;
      }
    },
  },

  events: {
    async signOut({ token }) {
      console.info("User signing out - attempting to revoke tokens");

      if (token.refresh_token && typeof token.refresh_token === "string") {
        try {
          await logoutRequest(token.refresh_token);
          console.info("Token revocation successful");
        } catch (error) {
          console.error("Token revocation failed:", error);
          // Don't throw - sign out should still succeed even if revocation fails
        }
      } else {
        console.warn("No valid refresh token available for revocation");
      }
    },

    async signIn({ user, account, profile }) {
      console.info("Sign in successful:", {
        userId: user.id,
        email: user.email,
        provider: account?.provider,
        profileId: profile?.sub || profile?.image,
      });
    },
  },

  // Configure JWT settings for short-lived tokens
  jwt: {
    maxAge: TOKEN_CONFIG.JWT_MAX_AGE,
  },

  // Configure session settings
  session: {
    strategy: "jwt",
    maxAge: TOKEN_CONFIG.JWT_MAX_AGE,
    updateAge: 60, // Update session every minute
  },

  // Configure pages (optional - customize sign-in/error pages)
  pages: {
    error: "/auth/error", // Custom error page to handle token refresh errors
    verifyRequest: "/auth/verify-request", // Email verification page
  },

  // Enable debug in development
  debug: process.env.NODE_ENV === "development",

  // Configure cookies for better security
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: TOKEN_CONFIG.JWT_MAX_AGE,
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 15, // 15 minutes
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 15, // 15 minutes
      },
    },
  },
};

// Extended types to include all custom properties
declare module "next-auth" {
  interface Session {
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
    provider?: string;
    error?: string;
    providerAccountId?: string;
    id_token: string;
  }

  // Add forceRefresh to session update type
  interface DefaultSession {
    forceRefresh?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
    provider?: string;
    error?: string;
    providerAccountId?: string;
    id_token: string;
  }
}
