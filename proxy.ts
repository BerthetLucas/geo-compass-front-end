import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { routing } from "./i18n/routing"

const intlMiddleware = createMiddleware(routing)

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip auth check for locale-prefixed login pages and public assets
  const isLoginPage =
    pathname === "/login" ||
    pathname === "/en/login" ||
    pathname === "/fr/login"

  const token = request.cookies.get("token")?.value

  if (!token && !isLoginPage) {
    // Redirect to locale-aware login
    const locale = pathname.startsWith("/fr") ? "fr" : "en"
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }

  if (token && isLoginPage) {
    const locale = pathname.startsWith("/fr") ? "fr" : "en"
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  // Run next-intl middleware for locale routing
  return intlMiddleware(request)
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
