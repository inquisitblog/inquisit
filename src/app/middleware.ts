import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl
  if (pathname === pathname.toLowerCase()) {
    return NextResponse.next()
  } else {
    return NextResponse.redirect(new URL(origin, pathname.toLowerCase()))
  }
}
