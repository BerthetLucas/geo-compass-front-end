import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { routing } from "./i18n/routing"

const intlMiddleware = createMiddleware(routing)

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip auth check for auth pages
  const isPublicAuthPage =
    pathname === "/login" ||
    pathname === "/en/login" ||
    pathname === "/fr/login" ||
    pathname === "/register" ||
    pathname === "/en/register" ||
    pathname === "/fr/register"

  const token = request.cookies.get("token")?.value

  if (!token && !isPublicAuthPage) {
    // Redirect to locale-aware login
    const locale = pathname.startsWith("/fr") ? "fr" : "en"
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }

  if (token && isPublicAuthPage) {
    const locale = pathname.startsWith("/fr") ? "fr" : "en"
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  // Run next-intl middleware for locale routing
  return intlMiddleware(request)
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
