/* eslint-disable */ 
// lib/auth/next-auth-options.ts
import type { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { refreshKeycloakToken, logoutRequest } from "./oidc";

// Validate required environment variables at startup
export const validateEnvironmentVariables = () => {
  // Skip validation if explicitly allowed
  if (process.env.SKIP_ENV_VALIDATION === "true") {
    console.warn("⚠️ Skipping environment variable validation (forced)");
    return process.env as Record<string, string>;
  }

  // In dev mode, just warn instead of crashing
  if (process.env.NODE_ENV !== "production") {
    console.warn("⚠️ Skipping strict env validation in development");
    return process.env as Record<string, string>;
  }

  // Strict validation in production
  const requiredVars = {
    OIDC_CLIENT_ID: process.env.OIDC_CLIENT_ID,
    OIDC_CLIENT_SECRET: process.env.OIDC_CLIENT_SECRET,
    OIDC_ISSUER: process.env.OIDC_ISSUER,
    CCP_GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    CCP_GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  };

  const missing = Object.entries(requiredVars)
    .filter(([_, v]) => !v)
    .map(([k]) => k);

  if (missing.length) {
    throw new Error(`❌ Missing required env vars: ${missing.join(", ")}`);
  }

  return process.env as Record<string, string>;
};

// Initialize environment variables
const env = validateEnvironmentVariables();

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
// const createHttpClient = () => {
//   return {
//     async fetch(url: string, options: RequestInit = {}): Promise<Response> {
//       const controller = new AbortController();
//       const timeoutId = setTimeout(
//         () => controller.abort(),
//         TOKEN_CONFIG.HTTP_TIMEOUT
//       );

//       try {
//         const response = await fetch(url, {
//           ...options,
//           signal: controller.signal,
//           headers: {
//             "Content-Type": "application/json",
//             "User-Agent": "NextAuth.js",
//             ...options.headers,
//           },
//         });
//         clearTimeout(timeoutId);
//         return response;
//       } catch (error) {
//         clearTimeout(timeoutId);
//         if (error instanceof Error && error.name === "AbortError") {
//           throw new Error(
//             `Request timeout after ${TOKEN_CONFIG.HTTP_TIMEOUT}ms`
//           );
//         }
//         throw error;
//       }
//     },
//   };
// };

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

validateAuthConfig();

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.OIDC_CLIENT_ID!,
      clientSecret: process.env.OIDC_CLIENT_SECRET!,
      issuer: process.env.OIDC_ISSUER,
      authorization: { params: { scope: "openid email profile" } },
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }) {
      // Initial Keycloak sign-in
      if (account?.provider === "keycloak" && user) {
        console.log("🔐 Keycloak sign-in successful", {
          userId: user.id,
          email: user.email,
          hasAccessToken: !!account.access_token,
          hasRefreshToken: !!account.refresh_token,
          expiresIn: account.expires_in,
        });

        const expiresAt = Math.floor(Date.now() / 1000) + Number(account.expires_in || 300);

        return {
          ...token,
          accessToken: account.access_token || "",
          refreshToken: account.refresh_token || "",
          expiresAt,
          user: {
            id: user.id || "",
            email: user.email || "",
            name: user.name || "",
          },
          requireRegistration: false,
          isRegistered: true,
          error: undefined,
        };
      }

      // Token refresh logic
      const currentTime = Math.floor(Date.now() / 1000);
      const bufferTime = 300; // 5 minutes buffer before expiry
      
      // Check if we have a refresh token and if the access token needs refresh
      if (!token?.refreshToken) {
        // No refresh token available, can't refresh
        if (token?.expiresAt && currentTime > token.expiresAt) {
          console.warn("⚠️ Token expired and no refresh token available");
          return { ...token, error: "TokenExpiredError" };
        }
        return token;
      }

      // Don't attempt refresh on tokens that are too old (likely invalid)
      const tokenAge = token.expiresAt ? currentTime - (token.expiresAt - (token.accessToken ? 600 : 300)) : 0; // Estimate token age
      if (tokenAge > 86400) { // 24 hours
        console.warn("⚠️ Refresh token too old, forcing re-authentication");
        return { ...token, error: "RefreshTokenTooOld" };
      }
      
      const needsRefresh = token.expiresAt && currentTime >= (token.expiresAt - bufferTime);

      if (needsRefresh) {
        try {
          console.log("🔄 Token refresh needed", {
            expiresAt: token.expiresAt,
            currentTime,
            timeUntilExpiry: token.expiresAt! - currentTime,
            tokenAge: Math.round(tokenAge / 3600 * 10) / 10 + 'h', // hours with 1 decimal
            hasRefreshToken: !!token.refreshToken
          });

          const refreshed = await refreshKeycloakToken(token.refreshToken);
          
          console.log("✅ Token refreshed successfully");
          return {
            ...token,
            accessToken: refreshed.accessToken,
            refreshToken: refreshed.refreshToken,
            expiresAt: currentTime + refreshed.expiresIn,
            error: undefined,
          };
        } catch (error) {
          console.error("❌ Token refresh failed in NextAuth:", error);
          
          // For "Session doesn't have required client" errors, force re-authentication
          const isSessionError = error instanceof Error && 
            (error.message.includes("RefreshTokenInvalidError") || 
             error.message.includes("Session doesn't have required client"));
          
          if (isSessionError) {
            console.warn("🔄 Refresh token invalid, will force re-authentication");
            // Clear the refresh token so NextAuth will redirect to login
            return { 
              ...token, 
              refreshToken: undefined,
              accessToken: undefined,
              error: "RefreshTokenInvalidError"
            };
          }
          
          // For other errors, keep trying with the same token
          return { 
            ...token, 
            error: "RefreshAccessTokenError"
          };
        }
      }

      // Check if token is already expired
      if (token?.expiresAt && currentTime > token.expiresAt && !token.refreshToken) {
        console.warn("⚠️ Token expired and no refresh token available");
        return { ...token, error: "TokenExpiredError" };
      }

      return token;
    },

    async session({ session, token }) {
      // If there's a token error, the session should reflect this
      if (token.error) {
        console.warn("⚠️ Session has token error:", token.error);
      }

      return {
        ...session,
        user: {
          id: token.user?.id || "",
          email: token.user?.email || "",
          name: token.user?.name || "",
        },
        accessToken: token.accessToken,
        error: token.error,
        requireRegistration: token.requireRegistration,
        isRegistered: token.isRegistered,
        oauthData: (token as any).oauthData,
      };
    },
  },

  events: {
    async signOut({ token }) {
      if (token?.refreshToken) {
        try {
          await logoutRequest(token.refreshToken);
          console.log("✅ Keycloak logout successful");
        } catch (error) {
          console.error("❌ Keycloak logout failed:", error);
        }
      }
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Add debug mode in development
  debug: process.env.NODE_ENV === "development",
};

// Type declarations remain the same...
declare module "next-auth" {
  interface Session {
    user: { id: string; email: string; name: string };
    accessToken?: string;
    error?: string;
    requireRegistration?: boolean;
    isRegistered?: boolean;
    provider?: "google" | "github"
    oauthData?: {
      email: string;
      name?: string;
      given_name?: string;
      family_name?: string;
      login?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    image?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    user?: { id: string; email: string; name: string };
    error?: string;
    requireRegistration?: boolean;
    isRegistered?: boolean;
    provider?: "google" | "github"
    oauthData?: {
      email: string;
      name?: string;
      given_name?: string;
      family_name?: string;
      login?: string;
    };
  }
}