import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  // agents.thekai.co → rewrite to /agents page
  if (hostname.startsWith("agents.")) {
    const pathname = request.nextUrl.pathname;
    // If already on /agents or /{locale}/agents, let it through
    if (pathname === "/" || pathname === "/tr" || pathname === "/en") {
      const url = request.nextUrl.clone();
      const locale = pathname === "/en" ? "/en" : "/tr";
      url.pathname = `${locale}/agents`;
      return NextResponse.rewrite(url);
    }
    // If path doesn't include /agents, prepend it
    if (!pathname.includes("/agents")) {
      const url = request.nextUrl.clone();
      url.pathname = `/tr/agents`;
      return NextResponse.rewrite(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - /api, /_next, /_vercel, /images, /favicon, etc.
  matcher: [
    "/((?!api|_next|_vercel|images|favicon|apple-touch-icon|.*\\..*).*)",
  ],
};
