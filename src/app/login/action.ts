"use server";

import { prisma } from "../../../prisma";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginUser(formData: FormData) {
  try {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    if (email && password) {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user) {
        const passwordControl = await bcrypt.compare(password, user?.password);
        if (passwordControl) {
          const secret = new TextEncoder().encode(process.env.JWT_SECRET);
          const alg = "HS256";

          const token = await new SignJWT({
            email: user.email,
            name: user.fullName,
          })
            .setExpirationTime("10min")
            .setProtectedHeader({ alg })
            .sign(secret);

          cookies().set("signinHash", token, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 1000 * 60 * 10),
          });
        }
      }
    }
  } catch (error) {
    return { error: "Bir hatayla karsilasildi " };
  }
  redirect(`/`)
}
