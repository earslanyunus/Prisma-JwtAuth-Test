import { cookies } from "next/headers"
import { prisma } from "../../../../prisma"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function GET(request:Request){
    const cookie = cookies()
    const token = cookie.get('signinHash')?.value
    if ( token ) {
      await prisma.blacklist.create({
        data:{
         token: token 
        }
      })
    }
    return NextResponse.json({result:'basarili'})
    // cookie.delete('signinHash')
    // redirect('/login')
}