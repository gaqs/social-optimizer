"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
    const [isOpen, setIsOpen] = useState(false); //para menu responsive
    const [active, setActive] = useState(""); //para verificar si se esta en la seccion de la pagina
    const pathname = usePathname(); //verifica seccion pagina y actualiza navbar

    //useEffect(setup, dependencies?)
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

    return (
        <nav className="h-[80px] w-full px-4 md:px-8 lg:px-8 xl:px-8 flex items-center text-sm font-bold text-gray-500 justify-between bg-neutral-50 z-30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] fixed">
            
        <Link href="/" className="flex flex-row gap-2 items-center text-black">
            <div>
                <SmilePlus size={30}/>
            </div>
            <div>
                <span className="text-xl font-bold text-indigo-600">Social</span>
                <span className="text-xl">Optimizer</span>
            </div>
        </Link>

        <ul className="md:flex hidden items-center gap-5">
            
            { sections.map( ({id,label}) => (
                <li key={`li_${id}`}>
                    <Link key="{id}" href={`/#${id}`} className={`hover:text-indigo-600 hover:underline hover:underline-offset-8 hover:decoration-3 ${ pathname == `/#${id}` || active == id ? "text-indigo-600 underline underline-offset-8 decoration-3" : "" }`}>
                        {label}
                    </Link>
                </li>
                )
            )}
            
        </ul>

        <ul className="md:flex hidden items-center gap-5">
            <li><Link href="#" className="font-bold">Ingresar</Link></li>
            <li>
                <Link href="#">
                    <Button variant="primary" className="font-bold">Acceso Gratuito</Button>
                </Link>
                
            </li>
        </ul>

        <button aria-label="menu-btn" type="button" className="menu-btn inline-block md:hidden active:scale-90 transition" onClick={ () => setIsOpen(!isOpen) }>
            { isOpen ? <X /> : <Menu /> }
        </button>

        <div className={`mobile-menu absolute top-[70px] left-0 w-full bg-gradient-to-r from-indigo-700 to-violet-500 p-6 transition-full md:hidden ${isOpen ? 'block':'hidden'}`}>
            <ul className="flex flex-col space-y-4 text-white text-lg">
                { sections.map( ({id,label}) => (
                    <li key={`li_${id}`}>
                        <Link key="{id}" href={`/#${id}`} className={`ms-6 text-sm hover:text-white-600 hover:underline hover:underline-offset-8 hover:decoration-3 ${ pathname == `/#${id}` || active == id ? "text-white-600 underline underline-offset-8 decoration-3" : "" }`}>
                            {label}
                        </Link>
                    </li>
                    )
                )}
                <li><Button className="text-sm font-bold" variant="secondary">Acceso Gratuito</Button></li>
            </ul>
            
            
        </div>
    </nav>


    );
}
