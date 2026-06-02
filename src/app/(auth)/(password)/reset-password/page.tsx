'use client'

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

import Input from "@/components/Input";
import Card from "@/components/Card";
import Button from "@/components/Button";

import { LockKeyholeOpen, ArrowLeft, CircleQuestionMark } from "lucide-react";

export default function ResetPassword() {

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleResend(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const token = new URLSearchParams(window.location.search).get("token") ?? '';
        if (!token) {
            console.log('no token whatsoever');
        }

        //verificar que ambas contraseñas ingresadas esten correctas
        const password = formData.get('password') as string;
        const repeatpassword = formData.get('repeatpassword') as string;

        if( password !== repeatpassword ){
            setError("Las contraseñas no coinciden.");
            setLoading(false);
            return;
        }

        const { data, error } = await authClient.resetPassword({
            newPassword: formData.get('password') as string, // required
            token, // required
        });
    }

    return(
        <>
            <main className="mx-auto bg-indigo-50 flex">
                <section id="login" className="container py-20 px-20 mt-0 md:mt-20">
                    <div className="flex justify-center">
                        <Card className="p-15 w-xl">
                            <div className="flex flex-col justify-center text-center mb-5">
                                <div className="flex flex-row justify-center mb-10">
                                    <LockKeyholeOpen size={64} className="text-indigo-600"/>
                                </div>
                                <h2 className="mb-5 font-bolder">¿Olvidaste tu contraseña?</h2>
                                <p className="mb-10">No te preocupes. Introduce tu correo electrónico y te enviaremos las instrucciones necesarias para recuperar el acceso a tu cuenta.</p>

                                <form onSubmit={handleResend} className="text-start">
                                    <Input label="Contraseña" type="password" name="password" placeholder="" className="mb-5" required/>
                                    <Input label="Repetir contraseña" type="password" name="repeatpassword" placeholder="" className="mb-5" required/>
                                    <Button type="submit" variant="primary" className="font-bold w-full" isLoading={loading}>
                                        Recuperar contraseña
                                    </Button>
                                </form>

                                {error && 
                                <div id="error" className="mx-auto bg-red">
                                    error
                                </div>
                                }
                                <hr className="my-10 bg-indigo-600 w-50 h-1 rounded opacity-20 mx-auto" />
                            </div>

                            <div className="flex flex-row justify-center gap-5">
                                <div className="flex items-center text-indigo-600 gap-1">
                                    <ArrowLeft />
                                    <span>Volver al inicio de sesión</span>
                                </div>
                                <div className="font-bold flex items-center text-neutral-500 gap-1">
                                    <CircleQuestionMark />
                                    <span>¿Necesitas ayuda?</span>
                                </div>
                            </div>
         
                        </Card>
                    </div>
                </section>
            </main>
        </>
    )
}