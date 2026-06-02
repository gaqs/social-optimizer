'use client'
import SideNav from "@/components/Sidenav";
import Image from "next/image"
import Card from "@/components/Card";
import {
    CloudUpload
} from "lucide-react";

export default function Post() {
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
                                <textarea className="w-full p-5 h-[150px]" placeholder="Cual es el menaje para hoy? usa @mensiones o #hastags para incrementar alcance"></textarea>
                            </Card>
                        </div>

                        <div id="right-post-container" className="col-span-4 grid gap-5">
                            <Card>
                                <div className="uppercase text-neutral-300 font-bold text-sm mb-2">
                                    Distribuir a
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div id="upload-instagram" className="flex flex-col items-center p-8 border-2 rounded-xl border-neutral-300 grayscale cursor-pointer">
                                        <Image src="/img/rrss/instagram.png" alt="rrss" width={30} height={30} priority/>
                                        <div className="mt-2 text-sm">Instagram</div>
                                    </div>
                                    <div id="upload-x" className="flex flex-col items-center p-8 border-2 rounded-xl border-neutral-300 grayscale cursor-pointer">
                                        <Image src="/img/rrss/x.png" alt="rrss" width={30} height={30} priority className="opacity-60"/>
                                        <div className="mt-2 text-sm">X</div>
                                    </div>
                                    <div id="upload-linkedin" className="flex flex-col items-center p-8 border-2 rounded-xl border-neutral-300 grayscale cursor-pointer">
                                        <Image src="/img/rrss/linkedin.png" alt="rrss" width={30} height={30} priority/>
                                        <div className="mt-2 text-sm">LinedIn</div>
                                    </div>
                                    <div id="upload-facebook" className="flex flex-col items-center p-8 border-2 rounded-xl border-neutral-300 grayscale cursor-pointer">
                                        <Image src="/img/rrss/facebook.png" className="rounded-lg" alt="rrss" width={30} height={30} priority/>
                                        <div className="mt-2 text-sm">Facebook</div>
                                    </div>
                                </div>
                            </Card>
                            <Card>
                                <div className="uppercase text-neutral-300 font-bold text-sm mb-2">
                                    Programar para
                                </div>
                                <div className="flex flex-cols gap-2"></div>
                            </Card>
                        </div>
                    </div>
                    
                </section>
            </main>
        </>
      )
}