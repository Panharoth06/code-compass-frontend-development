// session-update.ts
import { getServerSession as originalGetServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/next-auth-options";

const tokenStore = new Map();

export async function updateServerSession(
  userId: string,
  tokens: {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  }
) {
  tokenStore.set(userId, tokens);
}

export async function getStoredTokens(userId: string) {
  return tokenStore.get(userId);
}

export async function clearStoredTokens(userId: string) {
  tokenStore.delete(userId);
}

export async function getEnhancedServerSession() {
  const session = await originalGetServerSession(authOptions);

  if (session?.user?.id) {
    const storedTokens = tokenStore.get(session.user.id);
    if (storedTokens) {
      return {
        ...session,
        access_token: storedTokens.access_token,
        refresh_token: storedTokens.refresh_token,
        expires_at: storedTokens.expires_at,
      };
    }
  }

  return session;
}