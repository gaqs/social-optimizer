"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import { useEffect, useState } from "react";
import { SmilePlus, Menu, X } from "lucide-react";
import Button from "@/components/Button";

const sections = [
    { id: "", label: "Inicio"},
    { id: "header", label: "Sobre el Proyecto"},
    { id: "comunity", label: "Comunidad"},
    { id: "join", label: "Unete a Nosotros"},
];

export default function Navbar() {
    const router = useRouter()
    const { data: session, isPending } = authClient.useSession();
    
    const [isOpen, setIsOpen] = useState(false); //para menu responsive
    const [active, setActive] = useState(""); //para verificar si se esta en la seccion de la pagina
    const pathname = usePathname(); //verifica seccion pagina y actualiza navbar

    useEffect( () => {
        const observers: IntersectionObserver[] = [];

        sections.forEach( ({id}) => {
            const element = document.getElementById(id);
            if(!element) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if(entry?.isIntersecting){
                        setActive(id)
                    }
                },
                {
                    root: null,
                    rootMargin: "-50% 0px -50% 0px",
                    threshold: 0,
                }
            );
            observer.observe(element);
            observers.push(observer);  
        });

        return () => {
            observers.forEach( observer => observer.disconnect() );
        };
    },[]);

    const handleSignOut = async () => {
        await authClient.signOut()
        router.push("/login")
    }

    return (
        <nav className="fixed flex h-[80px] w-full px-4 md:px-8 lg:px-8 xl:px-8 text-sm font-bold text-gray-500 bg-neutral-50 z-90 shadow-[0_8px_30px_rgb(0,0,0,0.12)]" >
            
            <div id="logo-container" className="absolute left-4 top-1/2 -translate-y-1/2">
                <Link href="/" className="flex flex-row gap-2 items-center text-black">
                    <div>
                        <SmilePlus size={30}/>
                    </div>
                    <div>
                        <span className="text-xl font-bold text-indigo-600">Social</span>
                        <span className="text-xl">Optimizer</span>
                    </div>
                </Link> 
            </div>
            
            <div id="nav-items-container" className="flex flex-row items-center mx-auto">
                <ul className="md:flex grow hidden items-center gap-5">
                
                    { sections.map( ({id,label}) => (
                        <li key={`li_${id}`}>
                            <Link key="{id}" href={`/#${id}`} className={`hover:text-indigo-600 hover:underline hover:underline-offset-8 hover:decoration-3 ${ pathname == `/#${id}` || active == id ? "text-indigo-600 underline underline-offset-8 decoration-3" : "" }`}>
                                {label}
                            </Link>
                        </li>
                        )
                    )}
                    
                </ul>
            </div>
            
            <div id="auth-container" className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2">
                { isPending ? (
                    null
                ): session ? (   
                    <>
                        <div className="flex flex-row gap-5 items-center">
                            <span>Wenas, {session.user.name}</span>
                            <Button variant="white" onClick={ handleSignOut } className="font-bold">Cerrar Sesión</Button>
                        </div>
                    </>            
                ):(
                    <>
                        <ul className="md:flex items-center gap-5">
                            <li><Link href="/login" className="font-bold">Ingresar</Link></li>
                            <li>
                                <Link href="/register">
                                    <Button variant="primary" className="font-bold">Acceso Gratuito</Button>
                                </Link>
                            </li>
                        </ul>
                    </>
                )}
            </div>
        

        <button aria-label="menu-btn" type="button" className="menu-btn inline-block md:hidden active:scale-90 transition cursor-pointer" onClick={ () => setIsOpen(!isOpen) }>
            { isOpen ? <X /> : <Menu /> }
        </button>

        <div className={`mobile-menu absolute top-[70px] left-0 w-full bg-gradient-to-r from-indigo-600 to-violet-600 p-6 transition-full md:hidden ${isOpen ? 'block':'hidden'}`}>

            <ul className="flex flex-col space-y-4 text-white text-lg">
                { sections.map( ({id,label}) => (
                    <li key={`li_${id}`}>
                        <Link key="{id}" href={`/#${id}`} className={`ms-6 text-sm hover:text-white-600 hover:underline hover:underline-offset-8 hover:decoration-3`}>
                            {label}
                        </Link>
                    </li>
                    )
                )}
            </ul>

            <div id="auth-container-mobile">
                { isPending ? (
                    null
                ): session ? (   
                    <>
                        <div className="flex flex-col ms-6">
                            <hr className="my-5 bg-white w-50 h-1 rounded opacity-40" />
                            <div className="text-white hover:text-white-600 mb-5">Wenas, {session.user.name}

                            <Button variant="white" onClick={ handleSignOut } className="font-bold mt-5 rounded-lg">Cerrar Sesión</Button>

                            </div>
                            
                        </div>
                    </>            
                ):(
                    <>
                        <ul className="flex flex-col space-y-4 text-white text-lg mt-5">
                            <li className="ms-6 text-sm hover:text-white-600 hover:underline hover:underline-offset-8 hover:decoration-3 text-white-600">
                                <Link href="/login" className="font-bold">Ingresar</Link>
                            </li>
                            <li className="ms-6 text-sm">
                                <Link href="/register">
                                    <Button variant="white" className="font-bold rounded-lg">Acceso Gratuito</Button>
                                </Link>
                            </li>
                        </ul>
                    </>
                )}
            </div>

        </div>
    </nav>


    );
}
