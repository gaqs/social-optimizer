// lib/auth.ts
import { betterAuth, User } from "better-auth";
import { customSession } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { sendVerificationMailer, sendResetPasswordMailer } from "@/lib/mailer";
import { i18n } from "@better-auth/i18n";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    plugins: [
        i18n({
            translations: {
                es: {
                    USER_NOT_FOUND: "Usuario no encontrado",
                    INVALID_EMAIL_OR_PASSWORD: "Correo electrónico o contraseña inválidos",
                    INVALID_PASSWORD: "Contraseña inválida",
                    CREDENTIAL_ACCOUNT_NOT_FOUND:"Cuenta no encontrada para esta credencial",
                    EMAIL_NOT_VERIFIED: "Correo electrónico no verificado",
                    SESSION_EXPIRED: "Sesión expirada",
                    PASSWORD_TOO_SHORT: "La contraseña es demasiado corta",
                    PASSWORD_TOO_LONG: "La contraseña es demasiado larga",
                },
            },
        }),
        //añade avatar al objeto user de la session desde profile
        customSession(async({ user, session }) => {
            const profile = await prisma.profile.findUnique({
                where: { userId: user.id },
                select: { avatar: true }
            });

            return {
                user:{
                    ...user,
                    avatar: profile?.avatar || "/img/avatar.jpg",
                },
                session,
            };
        }),
        nextCookies(),
    ],
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendOnSignIn: true,
        sendResetPassword: async ({ user, token, url }, request) => {
            await sendResetPasswordMailer({
                to: user.email,
                name: user.name,
                token,
                url,
            });
        },
        onPasswordReset: async ({ user }: { user: User }) => {},
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: false,
        expiresIn: 60,
        async afterEmailVerification(user, request) {
            try {
                const existingProfile = await prisma.profile.findUnique({
                    where: { userId: user.id },
                });

                if (!existingProfile) {
                    await prisma.profile.create({
                        data: {
                            userId: user.id,
                        },
                    });
                    console.log(`Perfil creado para el usuario ${user.id}`);
                }
            } catch (error) {
                console.error(`Error creando perfil del usuario ${user.id}`);
                throw error;
            }
        },
        sendVerificationEmail: async ({ user, token, url }, request) => {
            await sendVerificationMailer({
                to: user.email,
                name: user.name,
                token,
                url,
            });
        },
    },
});
