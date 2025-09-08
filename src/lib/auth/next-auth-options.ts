// lib/auth/next-auth-options.ts
import { logoutRequest, refreshTokenRequest } from "./oidc";
import type { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

// Validate required environment variables at startup
const validateEnvironmentVariables = () => {
  const requiredVars = {
    OIDC_CLIENT_ID: process.env.OIDC_CLIENT_ID,
    OIDC_CLIENT_SECRET: process.env.OIDC_CLIENT_SECRET,
    OIDC_ISSUER: process.env.OIDC_ISSUER,
  };

  const missing = Object.entries(requiredVars)
    .filter(([value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return requiredVars as Record<keyof typeof requiredVars, string>;
};

// Constants for token management
const TOKEN_CONFIG = {
  DEFAULT_EXPIRES_IN: 180, // 3 minutes in seconds
  REFRESH_BUFFER_TIME: 30, // 30-second buffer before expiration
  JWT_MAX_AGE: 60 * 4, // 4 minutes - slightly longer than token expiration
  MAX_REFRESH_RETRIES: 2,
} as const;

// Initialize environment variables
const env = validateEnvironmentVariables();

// Utility function for safe token refresh with retries
const safeRefreshToken = async (
  refreshToken: string | undefined,
  retryCount: number = 0
): Promise<{
  access_token: string;
  refresh_token?: string;
  expires_in: number;
} | null> => {
  if (!refreshToken || typeof refreshToken !== 'string') {
    console.error('Invalid refresh token provided');
    return null;
  }

  try {
    const refreshed = await refreshTokenRequest(refreshToken);
    
    // Validate the refresh response
    if (!refreshed?.access_token) {
      console.error('Invalid refresh token response: missing access_token');
      return null;
    }

    return refreshed;
  } catch (error) {
    console.error(`Token refresh attempt ${retryCount + 1} failed:`, error);
    
    // Retry logic for transient failures
    if (retryCount < TOKEN_CONFIG.MAX_REFRESH_RETRIES) {
      console.info(`Retrying token refresh (${retryCount + 1}/${TOKEN_CONFIG.MAX_REFRESH_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Exponential backoff
      return safeRefreshToken(refreshToken, retryCount + 1);
    }
    
    return null;
  }
};

// Utility function to check if token needs refresh
const shouldRefreshToken = (expiresAt: number): boolean => {
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime >= (expiresAt - TOKEN_CONFIG.REFRESH_BUFFER_TIME);
};

// Utility function to calculate expiration time
const calculateExpiresAt = (expiresIn?: string | number): number => {
  const currentTime = Math.floor(Date.now() / 1000);
  const expirationSeconds = expiresIn 
    ? (typeof expiresIn === 'string' ? parseInt(expiresIn, 10) : expiresIn)
    : TOKEN_CONFIG.DEFAULT_EXPIRES_IN;
  
  return currentTime + Math.max(expirationSeconds, 60); // Minimum 1 minute
};

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: env.OIDC_CLIENT_ID,
      clientSecret: env.OIDC_CLIENT_SECRET,
      issuer: env.OIDC_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, account, trigger, session }) {
      // Initial sign in - store tokens from account
      if (account?.access_token) {
        console.info('Initial sign in - storing new tokens');
        return {
          ...token,
          access_token: account.access_token,
          refresh_token: account.refresh_token || token.refresh_token,
          expires_at: calculateExpiresAt(account.expires_at),
          error: undefined, // Clear any previous errors
        };
      }
      
      // Handle forced refresh triggers
      if (trigger === "update" && session?.forceRefresh) {
        console.info('Forced token refresh requested');
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
          console.error('Forced token refresh failed');
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
      
      // Skip refresh if token has error or is missing required fields
      if (token.error || !token.access_token || !token.expires_at) {
        console.warn('Token has error or missing required fields, skipping refresh');
        return token;
      }
      
      // Check if token needs refresh
      if (shouldRefreshToken(token.expires_at as number)) {
        console.info('Token expired or expiring soon, attempting refresh');
        
        const refreshed = await safeRefreshToken(token.refresh_token);
        
        if (refreshed) {
          console.info('Token refresh successful');
          return {
            ...token,
            access_token: refreshed.access_token,
            refresh_token: refreshed.refresh_token || token.refresh_token,
            expires_at: calculateExpiresAt(refreshed.expires_in),
            error: undefined,
          };
        } else {
          console.error('Token refresh failed - marking token as errored');
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
      
      // Token is still valid
      return token;
    },
    
    async session({ session, token }) {
      // Only attach tokens if they exist and are valid
      if (token.access_token && !token.error) {
        session.access_token = token.access_token as string;
        session.refresh_token = token.refresh_token as string;
        session.expires_at = token.expires_at as number;
        session.error = undefined;
      } else {
        // Handle error state
        session.error = (token.error as string) || "TokenError";
        console.warn('Session created with token error:', session.error);
      }
      
      return session;
    },
  },
  
  events: {
    async signOut({ token }) {
      console.info('User signing out - attempting to revoke tokens');
      
      if (token.refresh_token && typeof token.refresh_token === 'string') {
        try {
          await logoutRequest(token.refresh_token);
          console.info('Token revocation successful');
        } catch (error) {
          console.error('Token revocation failed:', error);
          // Don't throw - sign out should still succeed even if revocation fails
        }
      } else {
        console.warn('No valid refresh token available for revocation');
      }
    },
    
    async signIn({ user, account, profile }) {
      console.info('Sign in event:', { 
        userId: user.id, 
        email: user.email,
        provider: account?.provider, 
        profile: profile?.sub
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
  },
  
  // Configure pages (optional - customize sign-in/error pages)
  pages: {
    error: '/auth/error', // Custom error page to handle token refresh errors
  },
  
  // Enable debug in development
  debug: process.env.NODE_ENV === 'development',
};

// Extended types to include all custom properties
declare module "next-auth" {
  interface Session {
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
    error?: string;
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
    error?: string;
  }
}