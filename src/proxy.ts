import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = await auth.api.getSession({
        headers: await headers()
    })


    if( pathname == '/dashboard' && !session ){
        return NextResponse.rewrite(new URL("/login", request.url));
    } 

    if( (pathname == '/login' || pathname == '/register') && session ){
        return NextResponse.rewrite(new URL("/dashboard", request.url));
    } 

    return NextResponse.next();
}

export { proxy };

export const config = {
  matcher: [
    "/dashboard",
    "/login",
    "/register",
  ],
};