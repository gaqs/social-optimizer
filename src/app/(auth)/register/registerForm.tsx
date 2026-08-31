"use client";

import Input from "@/components/Input";
import Button from "@/components/Button";
import Toast from "@/components/Toast";
import FormError from "@/components/FormError";
import Link from "next/link";

import { useActionState } from "react";
import { submitRegister } from "./action";

const initialState: ActionResponse = {
    success: false,
    message: "",
};

export default function RegisterForm() {
    const [state, action, isPending] = useActionState(
        submitRegister,
        initialState,
    );

    return (
        <form action={action} className="w-full">

            <FormError errors={state.errors} />

            {/* Si hay un error general sin campo asociado (ej: fallo inesperado del server) */}
            {!state.success && state.message && !state.errors && (
                <div className="p-3 rounded-md mb-5 text-sm bg-red-50 text-red-700 border border-red-200">
                    {state.message}
                </div>
            )}

            {/* Campo Nombre Completo */}
            <div className="mb-5">
                <Input
                    label="Nombre completo"
                    type="text"
                    name="name"
                    placeholder="Tu nombre y apellido"
                    defaultValue={ state.inputs?.name }
                    className={state.errors?.name ? "border-red-500" : ""}
                    required
                />
            </div>

            {/* Campo Correo Electrónico */}
            <div className="mb-5">
                <Input
                    label="Correo electrónico"
                    type="email"
                    name="email"
                    placeholder="tucorreo@correo.com"
                    defaultValue={ state.inputs?.email }
                    className={state.errors?.email ? "border-red-500" : ""}
                    required
                />
            </div>

            {/* Campo Contraseña */}
            <div className="mb-2">
                <Input
                    label="Contraseña"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className={state.errors?.password ? "border-red-500" : ""}
                    required
                />
            </div>

            <Button
                type="submit"
                className="mt-8 w-full font-bold"
                variant="primary"
                isLoading={isPending}>
                Registrar
            </Button>

            <div className="flex flex-col text-center gap-5 mt-5">
                <div>
                    ¿Ya tienes una cuenta?{" "}
                    <Link href="/login" className="font-bold text-indigo-600">
                        Inicia sesión
                    </Link>
                </div>
            </div>
        </form>
    );
}
