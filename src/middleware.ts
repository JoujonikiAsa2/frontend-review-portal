import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const currentRoute = request.nextUrl.pathname;

  const session = await auth();
  const isPublicRoute =
    currentRoute === "/login" || currentRoute === "/register";

  console.log("from middleware", session);

  // Block unauthenticated users from private routes
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Block authenticated users from public routes
  if (session?.user && isPublicRoute) {
    return NextResponse.redirect(
      new URL(
        `/dashboard/${session?.user.role.toLowerCase()}/profile`,
        request.url
      )
    );
  }

  // Restrict dashboard access by role, but allow /payment for all authenticated users
  if (
    session?.user?.role &&
    !currentRoute.startsWith(`/dashboard/${session?.user.role.toLowerCase()}`) &&
    !currentRoute.startsWith(`/payment`)
  ) {
    return NextResponse.redirect(
      new URL(`/dashboard/${session?.user.role.toLowerCase()}/profile`, request.url)
    );
  }

  console.log(currentRoute);
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/payment/:path*"],
};
