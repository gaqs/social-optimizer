'use client'

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import Badge from "@/components/Badge";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Button from "@/components/Button";

import { FilePenLine, ChartColumnBig } from "lucide-react";

import { checkEmailExists } from "@services/register";

export default function Register() {

    const router = useRouter();
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        setError(null)
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        //verificar si el correo esta previamente registrado
        const exists = await checkEmailExists(formData.get('email') as string);
        if(exists){
            setError("Este correo ya se encuentra registrado.");
            setLoading(false);
            return;
        }
        
        await authClient.signUp.email({
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            name: formData.get('name') as string,
            callbackURL: '/verify-email?callback=true',
        },{
            onRequest: () => {
                sessionStorage.setItem('pendingEmail', formData.get('email') as string);
            },
            onSuccess: () => {
                router.push('/verify-email');
            },
            onError: (ctx) => {
                setLoading(false);
                setError(ctx.error.message ?? 'Error al registrarse')
                return;
            }
        })
    }

    return(
        <>
            <main className="mx-auto bg-indigo-50 flex">
                <section id="login" className="container py-20 px-20 mt-0 md:mt-20">
                    <div className="flex flex-row gap-20">
                        <div className="basis-1/2 relative">
                            <Badge>TU FUTURO ESTA AQUI</Badge>
                            <h1 className="mb-5">Comienza tu viaje hacia la <span className="text-indigo-600">excelencia social.</span></h1>
                            <div>Experimenta el seguimiento de rendimiento impulsado editorialmente. Transforma datos sociales en bruto en insights curados que impulsan un crecimiento auténtico.</div>
                            <div className="flex flex-row gap-20 mt-5 justify-center">
                                <Card className="grow rounded-3xl">
                                    <div className="icon_info p-3 bg-indigo-200 rounded-md text-indigo-600 mb-2 w-fit">
                                        <ChartColumnBig />
                                    </div>
                                    <span className="font-bold text-2xl">+94%</span><br/>Crecimiento
                                </Card>
                                <Card className="grow rounded-3xl">
                                    <div className="icon_info p-3 bg-orange-200 rounded-md text-orange-600 mb-2 w-fit">
                                        <FilePenLine />
                                    </div>
                                    <span className="font-bold text-2xl">156</span><br/>Post creados
                                </Card>
                            </div>
                            <div className="">
                                <Image src="/img/engagement_2.png" alt="graphic" width={0} height={0} sizes="100vw" className="w-fit overflow-hidden rounded-2xl" priority/>
                            </div>
                        </div>
                        <div className="basis-1/2 text-left">
                            <Card className="text-left p-15">
                                <h2>Crea tu cuenta</h2>
                                <div className="text-sm mt-2 mb-8">Unete a nuestra comunidad de usuarios y crea tu cuenta</div>

                                <div className="flex flex-col text-center gap-5 my-5">
                                    <div className="flex flex-row gap-10">
                                        <Button variant="white" className="grow">
                                            <Image src="/img/google.svg" alt="google" width={18} height={18}/> Google
                                        </Button>
                                        <Button variant="white" className="grow">
                                            <Image src="/img/linkedin.svg" alt="google" width={18} height={18}/> LinkedIn
                                        </Button>
                                    </div>
                                    <div className="my-5"> O continue con:</div>
                                </div>

                                <form onSubmit={handleSubmit} className="w-full">

                                    {error && <div className="text-red-500 mb-5">{error}</div>}

                                    <Input label="Nombre completo" type="text" name="name" placeholder="" className="mb-5" required/>

                                    <Input label="Correo electronico" type="email" name="email" placeholder="tucorreo@correo.com" className="mb-5" required/>

                                    <Input label="Contraseña" type="password" name="password" placeholder="" required/>
                                    <div className="text-sm">La contraseña debe tener un minimo de 8 caracteres</div>

                                    <Button type="submit" className="mt-8 w-full font-bold" variant="primary" isLoading={loading}>Registrar</Button>

                                    <div className="flex flex-col text-center gap-5 mt-5">
                                        <div>Ya tienes una cuenta? <Link href="/login" className="font-bold text-indigo-600">Inicia sesión</Link></div>
                                    </div>
                                </form>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}