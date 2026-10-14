"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const loginSchema = z.object({
    email: z
        .string()
        .min(1, "El correo electrónico es requerido")
        .email("Correo electrónico no válido")
        .trim()
        .toLowerCase(),
    password: z.string().min(6, "La contraseña debe ser de al menos 6 caracteres"),
});

export async function submitLogin(
    prevState: ActionResponse,
    formData: FormData,
): Promise<ActionResponse> {

    const rawData = Object.fromEntries(formData) as Record<string, string>;
    const { password, ...safeInputs } = rawData;

    const validatedFields = loginSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Por favor corrige los errores del formulario.",
            errors: validatedFields.error.flatten().fieldErrors,
            inputs: safeInputs,
        };
    }

    const { email, password: pwd } = validatedFields.data;

    let shouldRedirectToProfile = false;

    try {
        await auth.api.signInEmail({
            body: {
                email,
                password: pwd,
                rememberMe: true,
            },
            headers: await headers(),
        });
        shouldRedirectToProfile = true;

    } catch (error: any) {
        if (error?.body?.code === "EMAIL_NOT_VERIFIED") {
            redirect("/verify-email?error=EMAIL_NOT_VERIFIED");
        }

        return {
            success: false,
            message: "Por favor corrige los errores del formulario.",
            errors: {
                _form: [error?.message ?? "Ocurrió un error inesperado."],
            },
            inputs: safeInputs,
        };
    }

    if (shouldRedirectToProfile) {
        redirect("/profile");
    }

    // fallback, nunca debería llegar acá
    return { success: false, message: "Error inesperado." };
}