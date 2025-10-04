/* eslint-disable */ 
// lib/auth/next-auth-options.ts
import type { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { refreshKeycloakToken, logoutRequest } from "./oidc";

const validateAuthConfig = () => {
  const required = [
    "OIDC_CLIENT_ID",
    "OIDC_CLIENT_SECRET", 
    "OIDC_ISSUER",
    "NEXTAUTH_SECRET",
  ];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required authentication environment variables: ${missing.join(", ")}`
    );
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
      const currentTime = Math.floor(Date.now() / 1000);
      const buffer = 300; // refresh 5 minutes before expiry

      // === Initial sign-in ===
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expiresAt: currentTime + Number(account.expires_in || 300),
          user: { id: user.id, email: user.email, name: user.name },
        };
      }

      // === Token refresh ===
      if (token.expiresAt && currentTime >= token.expiresAt - buffer) {
        if (!token.refreshToken) {
          console.warn("❌ No refresh token available. User must log in again.");
          return { ...token, error: "RefreshError" };
        }

        try {
          console.log("🔄 Refreshing Keycloak token...");
          const refreshed = await refreshKeycloakToken(token.refreshToken);

          return {
            ...token,
            accessToken: refreshed.accessToken,
            refreshToken: refreshed.refreshToken ?? token.refreshToken, // update token
            expiresAt: currentTime + refreshed.expiresIn,
            error: undefined, // clear previous errors
          };
        } catch (err: any) {
          console.error("❌ Refresh failed:", err.message || err);

          // Force re-login if Keycloak rejects refresh token
          return {
            ...token,
            error: "RefreshError",
            accessToken: undefined,
            refreshToken: undefined,
            expiresAt: undefined,
          };
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.user?.id ?? "",
        email: token.user?.email ?? "",
        name: token.user?.name ?? "",
      };
      session.accessToken = token.accessToken;
      session.error = token.error;

      // Optional: reduce session size to prevent cookie overflow

      return session;
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