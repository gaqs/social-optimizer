'use client'

import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/Badge";
import Card from "@/components/Card";
import Button from "@/components/Button";
import LoginForm from "./loginForm";

export default function Login() {

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

                                    <LoginForm />
                                
                                    <div className="flex flex-col text-center gap-5 mt-5">

                                        <div className="my-5"> O continue con:</div>
                                        
                                        <div className="flex flex-row gap-10">
                                            <Button variant="border_white" className="grow">
                                                <Image src="/img/google.svg" alt="google" width={18} height={18}/> Google
                                            </Button>
                                            <Button variant="border_white" className="grow">
                                                <Image src="/img/rrss/facebook.png" alt="facebook" width={18} height={18}/> Facebook
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