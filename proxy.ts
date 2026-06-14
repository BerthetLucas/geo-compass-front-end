import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { routing } from "./i18n/routing"

const intlMiddleware = createMiddleware(routing)

const PUBLIC_AUTH_PATHS = ["/login", "/register"]

function getLocale(pathname: string): string {
  const segment = pathname.split("/")[1]
  return (routing.locales as readonly string[]).includes(segment)
    ? segment
    : routing.defaultLocale
}

function stripLocale(pathname: string): string {
  const segment = pathname.split("/")[1]
  if ((routing.locales as readonly string[]).includes(segment)) {
    return pathname.slice(segment.length + 1) || "/"
  }
  return pathname
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const locale = getLocale(pathname)
  const isPublicAuthPage = PUBLIC_AUTH_PATHS.includes(stripLocale(pathname))
  const token = request.cookies.get("token")?.value

  if (!token && !isPublicAuthPage) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }

  if (token && isPublicAuthPage) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
