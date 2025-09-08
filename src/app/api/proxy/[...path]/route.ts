import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/next-auth-options";
import { NextRequest, NextResponse } from "next/server";

async function proxy(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
  method: string
) {
  try {
    // Authentication Check
    const session = await getServerSession(authOptions);
    
    if (!session?.access_token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // URL Construction
    const { path } = await params;
    const url = `${process.env.BASE_URL_CODE_COMPASS}/${path.join("/")}${
      req.nextUrl.search
    }`;

    // Request Body Handling
    let body: string | undefined;
    if (["POST", "PUT", "PATCH"].includes(method)) {
      try {
        const requestBody = await req.json();
        body = JSON.stringify(requestBody);
      } catch (error) {
        console.error(error)
        // If request has no body or invalid JSON, continue without body
        body = undefined;
      }
    }

    // Forward Request to External API
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      body,
    });

    // Handle Response
    const contentType = res.headers.get("content-type");
    
    // Check if response is JSON
    if (contentType && contentType.includes("application/json")) {
      try {
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
      } catch (error) {
        console.log(error)
        // If JSON parsing fails, return the error
        return NextResponse.json(
          { error: "Invalid JSON response from API" },
          { status: 502 }
        );
      }
    } else {
      // Handle non-JSON responses (like plain text errors)
      const text = await res.text();
      return new NextResponse(text, {
        status: res.status,
        headers: {
          "Content-Type": contentType || "text/plain",
        },
      });
    }
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// HTTP Method Handlers
export const GET = (
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) => proxy(req, ctx, "GET");

export const POST = (
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) => proxy(req, ctx, "POST");

export const PUT = (
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) => proxy(req, ctx, "PUT");

export const DELETE = (
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) => proxy(req, ctx, "DELETE");

export const PATCH = (
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) => proxy(req, ctx, "PATCH");