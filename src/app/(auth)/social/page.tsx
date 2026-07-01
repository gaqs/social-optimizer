'use client'

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Badge from "@/components/Badge";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Button from "@/components/Button";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import {
    ShieldCheck,
    Dot,
    LockKeyholeOpen,
} from "lucide-react"

export default function Social() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const provider = searchParams.get('provider') || 'instagram';

    const content = {
        instagram: {
            title: "Autorizar Instagram",
            icon: "/img/rrss/instagram.png",
            button: "instagram"
        },
        tiktok: {
            title: "Autorizar Tiktok",
            icon: "/img/rrss/tiktok.png",
            button: "tiktok"
        },
        x: {
            title: "Autorizar X (Twitter)",
            icon: "/img/rrss/x.png",
            button: "x"
        },
        facebook: {
            title: "Autorizar Facebook",
            icon: "/img/rrss/facebook.png",
            button: "facebook"
        }
    }

    const currentContent = content[provider as keyof typeof content] ?? content.instagram;

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        setError(null); 
    }

    return(
        <>
            <main className="mx-auto bg-indigo-50 flex">
                <section id="login" className="container pb-20 pt-10 px-20 mt-0 md:mt-20">
                    <div className="flex justify-center">
                        <div className="w-lg">
                            
                            <Card className="text-left pt-5 pb-10 px-10">

                                <div className="flex flex-col text-center mx-auto items-center mb-5">
                                    <div className="mb-5">
                                        <Image src={currentContent.icon} alt="rrss" width={100} height={100} sizes="100vw" className="object-cover overflow-hidden" priority/>
                                    </div>
                                    <div>
                                        <h3>{currentContent.title}</h3>
                                        <div className="text-sm text-neutral-500 mt-5">
                                            Conecta tu ecosistema digital para una<br/>curaduría inteligente
                                        </div>
                                    </div>
                                </div>
    
                                <form onSubmit={handleSubmit} className="w-full">

                                    {error && <div className="text-red-500 mb-5">{error}</div>}

                                    <Input label="Correo electrónico" type="email" name="email" placeholder="tucorreo@correo.com" className="mb-5" required/>

                                    <Input label="Contraseña" type="password" name="password" placeholder="" required/>

                                    <Button type="submit" className="mt-8 mb-2 w-full font-bold" variant={currentContent.button} isLoading={loading}>Autorizar</Button>
                                    <Button type="submit" className="w-full font-bold" variant="white">Cancelar</Button>

                                    <div className="text-sm text-neutral-500 flex mt-10 gap-2">
                                        <ShieldCheck width={100} color="#4f46e5"/> 
                                        <div>
                                            Social Optimizer utiliza unicamente las <b>API oficiales</b> de las plataformas sociales. Tus credenciales nunca son almacenadas en nuestros servidores; las conexiones se realizan de forma cifrada mediante tokens de autorización temporales.
                                        </div>
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