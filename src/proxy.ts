import { NextRequest, NextResponse } from "next/server";
import {
  getNewTokensWithRefreshToken,
  getSession,
} from "./services/auth.service";
import { jwtUtils } from "./lib/jwtUtils";
import { isTokenExpiringSoon } from "./lib/tokenUtils";

enum Roles {
  Admin = "Admin",
  Provider = "Provider",
  Customer = "Customer",
}

async function refreshTokenIfNeeded(refreshToken: string): Promise<boolean> {
  try {
    const result = await getNewTokensWithRefreshToken(refreshToken);
    return !!result;
  } catch (err) {
    return false;
  }
}

async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Read tokens from cookies
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;


  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login?error=not_logged_in", request.url));
  }


  let accessValid = false;
  if (accessToken) {
    try {
      const verify = jwtUtils.verifyToken(
        accessToken,
        process.env.REFRESH_TOKEN_SECRET as string
      );
      accessValid = verify.success;
    } catch {
      accessValid = false;
    }
  }

  if (
    accessValid &&
    refreshToken &&
    (await isTokenExpiringSoon(accessToken as string))
  ) {
    const headers = new Headers(request.headers);
    const response = NextResponse.next({ request: { headers } });
    try {
      const refreshed = await refreshTokenIfNeeded(refreshToken);
      if (refreshed) headers.set("x-token-refreshed", "1");
      return NextResponse.next({
        request: { headers },
        headers: response.headers,
      });
    } catch { }
    // fallback to original next
    return response;
  }

  const session = await getSession();
  if (!session?.data || session.error || !session.success) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = session.data;
  const role: string = user.role;
  const status: string = user.status;



  // Block suspended users
  if (status === "suspend") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (role !== Roles.Customer && pathname.startsWith("/settings")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (role === "Customer" && pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/profile/user", request.url));
  }



  if (role === Roles.Admin && pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/admin/dashboard/profile", request.url));
  }

  if (role === Roles.Provider && pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/provider/dashboard/profile", request.url));
  }

  if (
    (role === Roles.Customer || role === Roles.Admin) &&
    pathname.startsWith("/provider")
  ) {
    return NextResponse.redirect(new URL("/login?error=provider_access_only_for_Provider", request.url));
  }
  if (
    (role === Roles.Admin || role === Roles.Provider) &&
    (pathname.startsWith("/orders") ||
      pathname.startsWith("/cart") ||
      pathname.startsWith("/checkout"))
  ) {
    const error =
      pathname.startsWith("/orders") ? "order_access_only_for_customer" :
        pathname.startsWith("/cart") ? "cart_access_only_for_customer" :
          pathname.startsWith("/checkout") ? "checkout_access_only_for_customer" :
            "access_only_for_customer";
    return NextResponse.redirect(new URL(`/login?error=${error}`, request.url));

  }
  if (
    pathname.startsWith("/admin") &&
    role !== Roles.Admin
  ) {
    return NextResponse.redirect(new URL("/login?error=admin_access_only", request.url));
  }

  if (
    pathname.startsWith("/provider") &&
    role !== Roles.Provider
  ) {
    return NextResponse.redirect(new URL("/login?error=provider_access_only", request.url));
  }

  if (role === Roles.Provider && pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/provider/dashboard", request.url));
  }

  if (role === Roles.Provider && pathname === "/provider") {
    return NextResponse.redirect(new URL("/provider/dashboard", request.url));
  }

  if (role === Roles.Admin && pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (role === Roles.Admin && pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }


}
export const config = {
  matcher: [
    "/profile",
    "/admin/:path*",
    "/provider",
    "/dashboard/:path*",
    "/provider/:path*",
    "/cart",
    "/checkout",
    "/orders/:path*",
    "/admin/:path*",
    "/settings"
  ],
};

export default proxy;
