/* eslint-disable */ 
// lib/auth/next-auth-options.ts
import type { JWT } from "next-auth/jwt";
import type { User } from "next-auth";
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

declare global {
  var __NEXTAUTH_REFRESH_TOKEN__: string | undefined;
}

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
 async jwt({ token, account, user }: { token: JWT; account: any | null; user: User | undefined }): Promise<JWT>
 {
    const currentTime = Math.floor(Date.now() / 1000);
    const buffer = 300;

    // === Initial login ===
    if (account && user) {
      globalThis.__NEXTAUTH_REFRESH_TOKEN__ = account.refresh_token;

      return {
        ...token, // include existing JWT fields
        accessToken: account.access_token,
        expiresAt: currentTime + Number(account.expires_in || 300),
        user: { id: user.id, name: user.name }, // minimal info
        error: undefined,
      };
    }

    // === Token refresh ===
    if (token.expiresAt && currentTime >= token.expiresAt - buffer) {
      const refreshToken = globalThis.__NEXTAUTH_REFRESH_TOKEN__;
      if (!refreshToken) {
        console.warn("❌ No refresh token available. User must log in again.");
        return {
          ...token,
          error: "RefreshError",
          accessToken: undefined,
          expiresAt: undefined,
        };
      }

      try {
        console.log("🔄 Refreshing Keycloak token...");
        const refreshed = await refreshKeycloakToken(refreshToken);

        // update server-side refresh token
        globalThis.__NEXTAUTH_REFRESH_TOKEN__ = refreshed.refreshToken ?? refreshToken;

        return {
          ...token,
          accessToken: refreshed.accessToken,
          expiresAt: currentTime + refreshed.expiresIn,
          error: undefined,
        };
      } catch (err: any) {
        console.error("❌ Refresh failed:", err.message || err);
        return {
          ...token,
          error: "RefreshError",
          accessToken: undefined,
          expiresAt: undefined,
        };
      }
    }

    return token;
  },

  async session({ session, token }): Promise<any> {
    session.user = {
      id: token.user?.id ?? "",
      name: token.user?.name ?? "",
    };
    session.accessToken = token.accessToken;
    session.error = token.error;

    return session;
  },
},


  events: {
    async signOut({ token }) {
      const refreshToken = globalThis.__NEXTAUTH_REFRESH_TOKEN__;
      if (refreshToken) {
        try {
          await logoutRequest(refreshToken);
          console.log("✅ Keycloak logout successful");
        } catch (error) {
          console.error("❌ Keycloak logout failed:", error);
        }
      }
    },
  },

  session: {
    strategy: "jwt", // keep JWT strategy, but minimal payload
    maxAge: 30 * 24 * 60 * 60,
  },

  debug: process.env.NODE_ENV === "development",
};



// Type declarations remain the same...
declare module "next-auth" {
  interface Session {
    user: { id: string; email?: string; name: string };
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
    user?: { id: string; email?: string; name: string };
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