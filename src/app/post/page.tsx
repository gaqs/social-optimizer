'use client'

import { useState } from "react";
import SideNav from "@/components/Sidenav";
import Image from "next/image"
import Card from "@/components/Card";
import Input from "@/components/Input";
import Switch from "@/components/Switch";
import Button from "@/components/Button";

import {
    CloudUpload,
    Sparkles,
    Check,
} from "lucide-react";

export default function Post() {
    const [enabled, setEnabled] = useState(false);
    const [active, setActive] = useState(false);

      return(
        <>
            <main className="mx-auto bg-indigo-10 flex bg-slate-50">
                <SideNav />

                <section id="dashboard" className="container py-20 px-20 mt-0 mt-10">
                    <div className="w-fill md:w-[50%]">
                        <h3 className="text-4xl font-bolder mb-3">Generador de Post</h3>
                        <div className="text-secondary text-sm mb-5">Crea y maneja tu contenido a travez de todas tus plataformas.</div>
                    </div>
                    <div id="post-container" className="grid grid-cols-12 gap-5">
                        <div id="left-post-container" className="col-span-8">
                            <Card className="bg-indigo-50 p-10 mb-5">
                                <div id="post-image-upload" className="w-full text-center flex flex-col items-center justify-center">
                                    <div className="p-5 bg-white rounded-full text-indigo-600 mb-2 w-fit"><CloudUpload size={32}/></div>
                                    <div className="font-bold mb-2">Arrastra y suelta archivos</div>
                                    <div className="text-sm text-neutral-400 mb-10">Sube imagenes, videos o reels en alta resolucion (Max. 100MB)</div>
                                    <div className="font-bold text-indigo-600">Buscar archivos</div>
                                </div>
                            </Card>
                            <Card>
                                <div className="uppercase text-neutral-300 font-bold text-sm mb-2">
                                    Espacio creativo
                                </div>
                                <textarea className="w-full p-5 h-[500px]" placeholder="Cual es el menaje para hoy? usa @mensiones o #hastags para incrementar alcance"></textarea>
                            </Card>
                        </div>

                        <div id="right-post-container" className="col-span-4 grid gap-5">
                            <Card>
                                <div className="uppercase text-neutral-300 font-bold text-sm mb-2">
                                    Distribuir a
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div id="upload-instagram" className="flex flex-col items-center p-5 pt-6 border-3 rounded-2xl border-blue-400 cursor-pointer text-blue-500 relative">
                                        <Check color={"#DDD"} className="bg-blue-400 rounded-full p-3 absolute top-1 right-1"/>
                                        <Image src="/img/rrss/instagram.png" alt="rrss" width={30} height={30} priority/>
                                        <div className="mt-2 text-sm">Instagram</div>
                                    </div>
                                    <div id="upload-x" className="flex flex-col items-center p-5 pt-6 border-2 rounded-2xl border-neutral-300 grayscale cursor-pointer">
                                        <Image src="/img/rrss/x.png" alt="rrss" width={30} height={30} priority className="opacity-60"/>
                                        <div className="mt-2 text-sm">X</div>
                                    </div>
                                    <div id="upload-linkedin" className="flex flex-col items-center p-5 pt-6 border-2 rounded-2xl border-neutral-300 grayscale cursor-pointer">
                                        <Image src="/img/rrss/linkedin.png" alt="rrss" width={30} height={30} priority/>
                                        <div className="mt-2 text-sm">LinedIn</div>
                                    </div>
                                    <div id="upload-facebook" className="flex flex-col items-center p-5 pt-6 border-2 rounded-2xl border-neutral-300 grayscale cursor-pointer">
                                        <Image src="/img/rrss/facebook.png" className="rounded-lg" alt="rrss" width={30} height={30} priority/>
                                        <div className="mt-2 text-sm">Facebook</div>
                                    </div>
                                </div>
                            </Card>
                            <Card>
                                <div className="flex justify-between uppercase text-neutral-300 font-bold text-sm mb-5">
                                    <div>
                                        Programar para
                                    </div>
                                    <div>
                                        <Switch checked={enabled} onChange={setEnabled} />
                                    </div> 
                                    
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="px-5 pb-2 pt-2 bg-indigo-50 rounded-3xl">
                                        <label className="uppercase text-xs">Día publicación</label>
                                        <Input type="date" className="w-full font-bold p-2 border-none rounded-lg border-neutral-300"/>
                                    </div>
                                    <div className="px-5 pb-2 pt-2 bg-indigo-50 rounded-3xl">
                                        <label className="uppercase text-xs">Hora publicación</label>
                                        <Input type="time" className="w-full font-bold p-2 border-none rounded-lg border-neutral-300"/>
                                    </div>
                                    
                                    

                                    <span className="flex flex-row text-amber-700 mt-5 text-sm">
                                        <div className="mr-2"><Sparkles /></div>
                                        <div className="font-bold"> Recomendado para maximo alcance</div>
                                    </span>

                                    <div id="ia-datetime" className="flex flex-row items-center justify-between p-5 bg-indigo-50 rounded-3xl gap-5">
                                        <div className="flex-col">
                                            <div className="font-bold"> Hoy, 8:45 PM </div>
                                            <div className="text-xs text-neutral-500"> Ventana optima para Instagram</div>
                                        </div>
                                        <div className="text-xs text-amber-600 font-bold rounded-2xl bg-amber-100 p-2">
                                            94% Ia Score
                                        </div>
                                    </div>
                                    <div id="ia-datetime" className="flex flex-row items-center justify-between p-5 bg-indigo-50 rounded-3xl gap-5">
                                        <div className="flex-col">
                                            <div className="font-bold"> Mañana, 10:45 PM </div>
                                            <div className="text-xs text-neutral-500"> Peak Global</div>
                                        </div>
                                        <div className="text-xs text-amber-600 font-bold rounded-2xl bg-amber-100 p-2">
                                            88% Ia Score
                                        </div>
                                    </div>
        

                                </div>
                            </Card>

                            <div>
                                <Button variant="primary" className="w-full mb-5 font-bold">Programar publicacion</Button>
                                <Button variant="white" className="w-full font-bold">Previsualizar borrador</Button>
                            </div>
                        </div>
                    </div>
                    
                </section>
            </main>
        </>
      )
}