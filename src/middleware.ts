import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const currentRoute = request.nextUrl.pathname;
  // Run the NextAuth.js middleware first
  const session = await auth();
  const isPublicRoute =
    currentRoute === "/login" || currentRoute === "/register";
  // if (!session && !isPublicRoute) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  console.log("from middleware", session);
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (session?.user && isPublicRoute) {
    return NextResponse.redirect(
      new URL(`/dashboard/${session?.user.role}/profile`, request.url)
    );
  }
  // Ensuring a particullar role session?.user can access only a particular route
  if (
    session?.user?.role &&
    !currentRoute.startsWith(`/dashboard/${session?.user.role}`)
  ) {
    return NextResponse.redirect(
      new URL(`/dashboard/${session?.user.role}`, request.url)
    );
  }
  console.log(currentRoute);
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
