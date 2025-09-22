"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthDebug() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="p-4 rounded">Loading session...</div>;
  }

  if (!session) {
    return (
      <div className="p-4 bg-red-100 rounded">
        <p className="text-red-800 mb-2">Not authenticated</p>
        <button 
          onClick={() => signIn("keycloak")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign In with Keycloak
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 text-black rounded">
      <p className="text-green-800 mb-2">✅ Authenticated</p>
      <div className="text-sm space-y-1 mb-4">
        <p><strong>User:</strong> {session.user?.email || session.user?.name || 'Unknown'}</p>
        <p><strong>Access Token:</strong> {session.accessToken ? '✅ Present' : '❌ Missing'}</p>
        <p><strong>Session Error:</strong> {session.error || 'None'}</p>
        <p>{session.accessToken}</p>
      </div>
      <button 
        onClick={() => signOut()}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
}