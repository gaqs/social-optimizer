'use client'

import SideNav from "@/components/Sidenav";
import Button from "@/components/Button";
import Image from "next/image"
import Card from "@/components/Card";
import Input from "@/components/Input";
import Link from "next/link";

import {
    Share2,
    IdCard,
    Link2,
    UserPlus,
} from "lucide-react";

export default function Settings() {

      return(
        <>
            <main className="mx-auto bg-indigo-10 flex bg-slate-50">
                <SideNav />

                <section id="config" className="container p-20 mt-10">
                    <h4 className="mb-2">Conecta tus redes sociales</h4>
                    <div className="text-neutral-400">Vincula las cuentas oficiales de la Municipalidad para comenzar a automatizar<br />publicaciones y obtener metricas de participacion ciudadana en tiempo real.</div>
                    <div className="grid grid-cols-2 gap-5 mt-5">
                        <div id="instagram" className="col-span-1">
                            <Card>
                                <div className="flex items-center mb-5 text-start">
                                    <Image src="/img/rrss/instagram.png" alt="rrss" width={50} height={50} sizes="50px" className="object-cover me-5" priority/>
                                    <div className="flex flex-col">
                                        <h5>Instagram</h5>
                                        <div className="text-neutral-500 text-sm mt-2">Publica Reels y fotos directamente</div>
                                    </div>
                                </div>
                                <Link href="/social?provider=instagram">
                                    <Button className="w-full font-bold text-indigo-600" variant="border_white">Conectar →</Button>
                                </Link>
                            </Card>
                        </div>
                        <div id="facebook" className="col-span-1">
                            <Card>
                                <div className="flex items-center mb-5 text-start">
                                    <Image src="/img/rrss/facebook.png" alt="rrss" width={50} height={50} sizes="50px" className="object-cover me-5" priority/>
                                    <div className="flex flex-col">
                                        <h5>Facebook</h5>
                                        <div className="text-neutral-500 text-sm mt-2">Publica Reels y fotos directamente</div>
                                    </div>
                                </div>
                                <Link href="/social?provider=facebook">
                                    <Button className="w-full font-bold text-indigo-600" variant="border_white">Conectar →</Button>
                                </Link>
                            </Card>
                        </div>
                        <div id="x" className="col-span-1">
                            <Card>
                                <div className="flex items-center mb-5 text-start">
                                    <Image src="/img/rrss/x.png" alt="rrss" width={50} height={50} sizes="50px" className="object-cover me-5" priority/>
                                    <div className="flex flex-col">
                                        <h5>X (Twitter)</h5>
                                        <div className="text-neutral-500 text-sm mt-2">Publica Reels y fotos directamente</div>
                                    </div>
                                </div>
                                <Link href="/social?provider=x">
                                    <Button className="w-full font-bold text-indigo-600" variant="border_white">Conectar →</Button>
                                </Link>
                            </Card>
                        </div>
                        <div id="tiktok" className="col-span-1">
                            <Card>
                                <div className="flex items-center mb-5 text-start">
                                    <Image src="/img/rrss/Tiktok.png" alt="rrss" width={50} height={50} sizes="50px" className="object-cover me-5" priority/>
                                    <div className="flex flex-col">
                                        <h5>Tiktok</h5>
                                        <div className="text-neutral-500 text-sm mt-2">Publica Reels y fotos directamente</div>
                                    </div>
                                </div>
                                <Link href="/social?provider=tiktok">
                                    <Button className="w-full font-bold text-indigo-600" variant="border_white">Conectar →</Button>
                                </Link>
                            </Card>
                        </div>
                    </div>
                </section>  
            </main>
        </>
      )
}