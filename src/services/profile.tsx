'use server';

import { authClient } from "@/lib/auth-client";
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


export async function updateUserProfile(userId: string, data: any) {
    return prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            name: data.name,
            email: data.email,
            profile: {
                upsert: {
                    create: {
                        occupation: data.occupation,
                        bio: data.bio,
                        phone: data.phone,
                        address: data.address,
                        city: data.city,
                        country: data.country,
                    },
                    update: {
                        occupation: data.occupation,
                        bio: data.bio,
                        phone: data.phone,
                        address: data.address,
                        city: data.city,
                        country: data.country,
                    },
                },
            },
        },
    });
}

export async function updateUserProfileAvatar( userId: string, avatarUrl: string) {
    await prisma.user.update({
        where: { id: userId },
        data: {
            profile: {
                upsert:{
                    create: {
                        avatar: avatarUrl
                    },
                    update: {
                        avatar: avatarUrl
                    }
                }
            }
        }
    });
}
