'use server';

import { prisma } from "@/lib/prisma";

//verifica si el correo se encuentra en la base de datos | return true o false
export async function checkEmailExists(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return !!user;
} 