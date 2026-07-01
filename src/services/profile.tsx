'use server';

import { prisma } from "@/lib/prisma";

//verifica si el correo se encuentra en la base de datos | return true o false
export async function getUserProfile(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId
    },
    include:{
      profile: true
    }
  })
}