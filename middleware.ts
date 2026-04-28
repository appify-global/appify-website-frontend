import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Canonical public hostname (no port).
 * Override via Railway env if staging uses a different host.
 */
const CANONICAL_HOST = process.env.CANONICAL_HOST ?? "www.appify.global";

/** Apex hostname — redirect to CANONICAL_HOST so crawlers/users don't hit broken apex. */
const APEX_HOST = "appify.global";

export function middleware(request: NextRequest) {
  const raw =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    "";
  const hostname = raw.split(":")[0]?.toLowerCase() ?? "";

  if (hostname !== APEX_HOST) {
    return NextResponse.next();
  }

  const dest = request.nextUrl.clone();
  dest.hostname = CANONICAL_HOST;
  dest.protocol = "https:";
  dest.port = "";

  return NextResponse.redirect(dest, 308);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
};
