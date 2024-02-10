"use server";

import { prisma } from "../../../prisma";
import bcrypt from "bcrypt";

export async function createUser(formData: FormData) {
  try {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString();
    if (email && password) {
      const hashedPassword = bcrypt.hashSync(password, 10);

      await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          fullName:name
        },
      });
    }
  } catch (error) {
    console.log(error);
    
    return {error:'Bir hatayla karsilasildi '}
  }
}
