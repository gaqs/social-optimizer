"use client";

import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import FormError from "@/components/FormError";

import { useActionState } from "react";
import { submitLogin } from "./action";

const initialState: ActionResponse = {
    success: false,
    message: "",
};

export default function LoginForm() {
    const [state, action, isPending] = useActionState(
        submitLogin,
        initialState,
    );

    return (
        <form action={action} className="w-full">
            
            <FormError errors={state.errors} />
            
            <div className="mb-5">
                <Input
                    label="Correo electronico"
                    type="email"
                    name="email"
                    placeholder="tucorreo@correo.com"
                    defaultValue={state.inputs?.email}
                    className={state.errors?.email ? "border-red-500" : ""}
                    required
                />
            </div>
            <div className="mb-5">
                <Input
                    label="Contraseña"
                    type="password"
                    name="password"
                    className={state.errors?.password ? "border-red-500" : ""}
                    placeholder=""
                    required
                />
            </div>
            
            <Link href="/forgot-password"
                className="float-end font-bold text-indigo-600 mt-3 mb-5">
                Olvidaste tu contraseña?
            </Link>

            <Button
                type="submit"
                className="mt-8 w-full font-bold"
                variant="primary"
                isLoading={isPending}>
                Ingresar
            </Button>
        </form>
    );
}