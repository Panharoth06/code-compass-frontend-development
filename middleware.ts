// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // If unauthorized, withAuth will handle the redirect automatically
    // when the pages.signIn option is set
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/signup', // Your custom signup page
    },
  }
);

export const config = {
  matcher: [
    "/problemdetails/:path*",
    "/dashboard/:path*", 
    "/profile/:path*",
    "/submit/:path*",
  ],
};