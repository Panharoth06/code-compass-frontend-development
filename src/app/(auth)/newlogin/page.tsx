"use client";

import { useOauthRegisterMutation } from "@/lib/services/signUp/signUp";
import { useGetCurrentUserQuery } from "@/lib/services/user/userApi";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AuthDebug() {
  const { data: session, status } = useSession();
  const [hasToken, setHasToken] = useState<boolean | null>(null);
  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError,
  } = useGetCurrentUserQuery();

  const [oauthRegister, { isLoading: isRegistering, isSuccess: isRegistered, error: registerError }] = useOauthRegisterMutation();


  // Check token status securely
  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch("/api/auth/token", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setHasToken(data.hasToken);
        } else {
          setHasToken(false);
        }
      } catch (error) {
        console.error("Failed to check token status:", error);
        setHasToken(false);
      }
    };

    if (session) {
      checkToken();
    }
  }, [session]);

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
    <div className="p-4 text-black bg-white rounded">
      <p className="text-green-800 mb-2">✅ Authenticated</p>

      <div className="text-sm space-y-2 mb-4">
        <p>
          <strong>User:</strong>{" "}
          {session.user?.email || session.user?.name || "Unknown"}
        </p>
        <div>
          <button
            onClick={() => oauthRegister()}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            disabled={isRegistering}
          >
            {isRegistering ? "Registering..." : "Create OAuth"}
          </button>
          {isRegistered && <span className="ml-2 text-green-600">OAuth Created!</span>}
          {registerError && <span className="ml-2 text-red-600">Error creating OAuth</span>}
        </div>
        <p>
          <strong>Access Token:</strong>{" "}
          {hasToken
            ? "✅ Present (secure)"
            : hasToken === false
            ? "❌ Missing"
            : "Checking..."}
        </p>

        {/* Profile Data */}
        <div className="mt-4 pt-4 border-t">
          <strong>Profile Data:</strong>
          {profileLoading && (
            <p className="text-gray-600">Loading profile...</p>
          )}
          {profileError && (
            <div className="text-red-600">
              Error loading profile:{" "}
              {"status" in profileError
                ? profileError.status
                : "Unknown error"}
            </div>
          )}
          {profileData && (
            <div className="mt-2 space-y-1">
              <p>
                Name: {profileData.username}
              </p>
              <div className="relative w-10 h-10">
              <Image
              fill
              src={profileData.imageUrl}
              alt={profileData.username}
              />

              </div>
            </div>
          )}
        </div>
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