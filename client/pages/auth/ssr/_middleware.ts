import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const request = req.nextUrl.pathname;
  console.log(request);
}
