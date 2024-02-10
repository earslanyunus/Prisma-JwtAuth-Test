import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { PrismaClient } from "@prisma/client/edge";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("signinHash");
  const reqCookies = request.cookies
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  if (token?.value) {
    try {
      const request = await fetch("http://localhost:3000/api/checkUser", {
        method: "GET",
        headers: {
          cookie: token.value,
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();

      if (response.status === 211) {
        console.log('211 calisti');
        
        const newResponse =  NextResponse.redirect(new URL("/login", request.url))
        newResponse.cookies.delete('signinHash')
        return newResponse
      } else {
        console.log('else calisti')
        
        const user = await jose.jwtVerify(token.value, secret);
        console.log(user);

        const response2 = NextResponse.next();
        if (user.payload.name && typeof user.payload.name === "string") {
          response2.headers.set("name", user.payload.name);
        }
        return response2;
      }
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    console.log('token yok');
    
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|login|signup|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
