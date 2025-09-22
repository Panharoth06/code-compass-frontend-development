import { authOptions } from "@/lib/auth/next-auth-options";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Return minimal information - no tokens exposed
    return NextResponse.json({
      isAuthenticated: true,
      user: session.user,
      requireRegistration: session.requireRegistration,
      isRegistered: session.isRegistered,
    });
  } catch (error) {
    console.error("Token API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}