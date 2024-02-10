import { cookies } from "next/headers";
import { prisma } from "../../../../prisma";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function GET(request:Request){
    try {
        const allcookie = cookies()
        const userCookie = request.headers.get('cookie')
        
        
        
        
        
        
    const isBlocked = await prisma.blacklist.findUnique({
        where:{
            token:userCookie || ''
        }
    })
    if (isBlocked) {
        return NextResponse.json({status:211})

    }else{
        return NextResponse.json({status:200})

    }
    

    } catch (error) {
        console.log('catch calisti',error);
        
        return NextResponse.json({status:200})
        
    }
    
    
}