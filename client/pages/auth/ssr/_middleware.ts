import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const cookie = req.cookies;

  if (cookie["refreshToken"]) {
    return NextResponse.next();
  }

  return NextResponse.redirect("/login", 307);
}
