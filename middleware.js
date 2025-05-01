import { NextResponse } from "next/server";

// Define your public routes that should be accessible without authentication
const publicRoutes = ["/",];

// Define your private routes that require authentication
const privateRoutes = ["/dashboard"];

// Define all valid routes in your application
const validRoutes = [...publicRoutes, ...privateRoutes];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if user is authenticated by looking for the auth token in cookies
  const authToken = request.cookies.get("session_data")?.value;
  const isAuthenticated = !!authToken;

  // If the route doesn't exist (not in our valid routes list)
  if (!validRoutes.includes(pathname)) {
    // If user is authenticated, redirect to dashboard
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // If user is not authenticated, redirect to login page
    else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // For private routes, check if user is authenticated
  if (privateRoutes.includes(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // For login/register pages, redirect to dashboard if already authenticated
  if (pathname === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Otherwise, continue with the request
  return NextResponse.next();
}

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all routes except:
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all files with extensions (e.g. favicon.ico)
     */
    "/((?!api|_next|_static|.*\\..*).*)",
  ],
};
