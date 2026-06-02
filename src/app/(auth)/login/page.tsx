'use client'

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Badge from "@/components/Badge";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Button from "@/components/Button";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Login() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        setError(null);
        
        const formData = new FormData(e.currentTarget);

        const {data, error} = await authClient.signIn.email({
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            callbackURL: "/dashboard",
            rememberMe: false
        }, {
            onRequest: () => {
                setLoading(true);
            },
            onSuccess: () => {
                setLoading(false);
                router.push('/dashboard');
            },
            onError: (ctx) => {
                setLoading(false);

                if( ctx.error.code == "EMAIL_NOT_VERIFIED"){
                    sessionStorage.setItem('pendingEmail', formData.get('email') as string);
                    router.push(`/verify-email?error=EMAIL_NOT_VERIFIED`);
                }else{
                    setError(ctx.error.message ?? 'Error al iniciar sesion');
                    return;
                }   
            }
        })
    }

    return(
        <>
            <main className="mx-auto bg-indigo-50 flex">
                <section id="login" className="container py-20 px-20 mt-0 md:mt-20">
                    <div className="flex flex-row gap-20">
                        <div className="basis-1/2 relative">
                            <Badge>SOCIAL OPTIMIZER</Badge>
                            <h1 className="mb-5">Eleva tu presencia social con <span className="text-indigo-600">inteligencia.</span></h1>
                            <div>Maneja, analiza, y haz crecer tu audienciao digital a travez de todas tus plataformas con nuestros sistema de edicion.</div>
                            <Card className="w-64 absolute bottom-0 right-0">
                                <Image src="/img/grafico.png" alt="graphic" width={0} height={0} sizes="100vw" className="w-fit overflow-hidden rounded-2xl" priority/>
                            </Card>
                        </div>
                        <div className="basis-1/2 text-left">
                            <Card className="text-left p-15">
                                <h2>Bienvenido de vuelta</h2>
                                <div className="text-sm mt-2 mb-8">Ingresa tus credenciales para acceder a tu dashboard</div>

                                <form onSubmit={handleSubmit} className="w-full">

                                    {error && <div className="text-red-500 mb-5">{error}</div>}

                                    <Input label="Correo electronico" type="email" name="email" placeholder="tucorreo@correo.com" className="mb-5" required/>

                                    <Input label="Contraseña" type="password" name="password" placeholder="" required/>
                                    <Link href="/forgot-password" className="float-end font-bold text-indigo-600 mt-3 mb-5">Olvidaste tu contraseña?</Link>

                                    <Button type="submit" className="mt-8 w-full font-bold" variant="primary" isLoading={loading}>Ingresar</Button>
                                    
                                </form>
                                
                                    <div className="flex flex-col text-center gap-5 mt-5">

                                        <div className="my-5"> O continue con:</div>
                                        
                                        <div className="flex flex-row gap-10">
                                            <Button variant="white" className="grow">
                                                <Image src="/img/google.svg" alt="google" width={18} height={18}/> Google
                                            </Button>
                                            <Button variant="white" className="grow">
                                                <Image src="/img/linkedin.svg" alt="google" width={18} height={18}/> LinkedIn
                                            </Button>
                                        </div>

                                        <div>No tienes una cuenta? <Link href="/register" className="font-bold text-indigo-600">Registrate</Link></div>

                                    </div>
                                
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}