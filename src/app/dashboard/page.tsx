'use client'

import SideNav from "@/components/Sidenav";
import Card from "@/components/Card";
import {
    Users,
    Heart,
    Eye,
    TrendingUp,
    Clock,
    Sparkles,
    Moon,
    Hamburger
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Charts from "./_sections/Charts";

export default function Dashboard() {
    return(
        <>
            <main className="mx-auto bg-indigo-10 flex bg-slate-50">
                <SideNav />

                <section id="dashboard" className="container py-20 px-20 mt-0 mt-10">
                    <div className="w-fill md:w-[50%]">
                        <h3 className="text-4xl font-bolder mb-3">Descripción general del rendimiento</h3>
                        <div className="text-secondary text-sm mb-5">Aquí puedes ver un resumen de tu rendimiento en las redes sociales, incluyendo métricas clave como seguidores, engagement y alcance.</div>
                    </div>
                    <div id="top-card-container" className="grid grid-cols-4 gap-5 mb-10">
                        <Card className="md:col-span-1 col-span-2">
                            <div className="flex flex-grow justify-stretch items-center gap-5">
                                <div id="top-card-icon" className="p-3 bg-indigo-100 rounded-md text-indigo-600 mb-2 w-fit">
                                    <Users />
                                </div>
                                <div id="top-card-porcentaje" className="text-green-500 bg-green-50 px-2 py-1 rounded-md w-fit">
                                    +4.5%
                                </div>
                            </div>
                            <div id="top-card-total">
                                <div className="text-sm mt-4">Seguidores Totales</div>
                                <h4 className="mt-2">120.000</h4>
                            </div>
                        </Card>
                        <Card className="md:col-span-1 col-span-2">
                            <div className="flex flex-grow justify-stretch items-center gap-5">
                                <div id="top-card-icon" className="p-3 bg-red-100 rounded-md text-red-600 mb-2 w-fit">
                                    <Heart />
                                </div>
                                <div id="top-card-porcentaje" className="text-red-500 bg-red-50 px-2 py-1 rounded-md w-fit">
                                    -1.5%
                                </div>
                            </div>
                            <div id="top-card-total">
                                <div className="text-sm mt-4">Interacción Promedio</div>
                                <h4 className="mt-2">1.2%</h4>
                            </div>
                        </Card>
                        <Card className="md:col-span-1 col-span-2">
                            <div className="flex flex-grow justify-stretch items-center gap-5">
                                <div id="top-card-icon" className="p-3 bg-amber-100 rounded-md text-amber-600 mb-2 w-fit">
                                    <Eye />
                                </div>
                                <div id="top-card-porcentaje" className="text-green-500 bg-green-50 px-2 py-1 rounded-md w-fit">
                                    +4.5%
                                </div>
                            </div>
                            <div id="top-card-total">
                                <div className="text-sm mt-4">Alcance Semanal</div>
                                <h4 className="mt-2">412K</h4>
                            </div>
                        </Card>
                        <Card className="md:col-span-1 col-span-2">
                            <div className="flex flex-grow justify-stretch items-center gap-5">
                                <div id="top-card-icon" className="p-3 bg-cyan-100 rounded-md text-cyan-600 mb-2 w-fit">
                                    <TrendingUp />
                                </div>
                                <div id="top-card-porcentaje" className="text-green-500 bg-green-50 px-2 py-1 rounded-md w-fit">
                                    +2.3%
                                </div>
                            </div>
                            <div id="top-card-total">
                                <div className="text-sm mt-4">Tasa de conversión</div>
                                <h4 className="mt-2">1.2%</h4>
                            </div>
                        </Card>
                    </div>
                    <div id="graph-time-container" className="grid grid-cols-12 gap-5">
                        <Card className="col-span-12 md:col-span-8">
                            <div id="graph-container">
                                <Charts />
                            </div>
                        </Card>
                        <Card className="col-span-12 md:col-span-4">
                            <div id="next-container">
                                <h4 className="mb-5">Próximo contenido</h4>
                                <div id="next-post-container">
                                    <div id="next-post-rrss" className="font-bold text-gray-500 mb-2">
                                        Instagram
                                    </div>
                                    <div id="next-post-image-container" className="relative max-h-[300px] overflow-hidden rounded-2xl text-black">
                                        <Image src="/img/test_1.jpg" alt="rrss" width={0} height={0} sizes="100vw" className="w-full h-full object-cover " priority/>
                                        <div id="inset-shadow" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-[1]" />
                                        <div id="next-post-text" className="absolute p-5 z-10 bottom-0 font-bold text-white">
                                            "Una mañana en la playa con amigos, disfrutando del sol y la brisa marina. #Verano #Amigos #Playa"
                                        </div>
                                    </div>
                    
                                    <div id="next-post-date-container" className="flex flex-row items-center gap-2 mt-5 font-bold">
                                        <Clock className="text-indigo-600"/>
                                        <span>Mañana, 10:30AM</span>
                                        <span>
                                            <Link className="text-indigo-600 place-self-end" href="https://www.instagram.com/p/Cq8n9XoLh1e/" target="_blank">
                                                Ver publicación »
                                            </Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div id="ai-suggestions-container" className="mt-10">
                        <Card className="bg-indigo-50 p-10">
                            <div id="ai-sugestions-title" className="flex flex-row items-center gap-3">
                                <div className="p-5 bg-indigo-600 rounded-2xl text-white mb-2 w-fit"><Sparkles size={32}/></div>
                                <div className="flex-col gap-1">
                                    <h3>Sugerencias AI</h3>
                                    <span className="text-sm text-grey-100">Machine Learning basados en la actividad de tu audiencia</span>
                                </div>
                            </div>
                            <div id="ai-sugestions-list" className="mt-5 grid grid-cols-3 gap-8">
                                <Card className="bg-white md:col-span-1 col-span-3">
                                    <div id="ai-title" className="text-yellow-500 font-bold flex flex-row gap-2 mb-2"><Clock/> <span>Hora de Oro</span></div>
                                    <div id="ai-hour" className="font-bold text-3xl text-indigo-600 mb-2">08:15 AM</div>
                                    <div id="ai-description" className="text-sm">Pico de interacción de la audiencia en <b>Instagram</b>. Alta actividad profesional detectada</div>
                                    <hr className="my-5 bg-indigo-600 rounded opacity-20" />
                                    <div id="ai-prediction" className="text-sm text-amber-950">Probabilidad de interacción: <span id="ai-prediction-interaction">+22%</span></div>
                                </Card>
                                <Card className="bg-white md:col-span-1 col-span-3">
                                    <div id="ai-title" className="text-sky-950 font-bold flex flex-row gap-2 mb-2"><Moon/> <span>Empujon de la Tarde</span></div>
                                    <div id="ai-hour" className="font-bold text-3xl text-indigo-600 mb-2">08:15 AM</div>
                                    <div id="ai-description" className="text-sm">Pico de interacción de la audiencia en <b>Instagram</b>. Alta actividad profesional detectada</div>
                                    <hr className="my-5 bg-indigo-600 rounded opacity-20" />
                                    <div id="ai-prediction" className="text-sm text-amber-950">Probabilidad de interacción: <span id="ai-prediction-interaction">+22%</span></div>
                                </Card>
                                <Card className="bg-white md:col-span-1 col-span-3">
                                    <div id="ai-title" className="text-red-700 font-bold flex flex-row gap-2 mb-2"><Hamburger/> <span>Hora de descanso</span></div>
                                    <div id="ai-hour" className="font-bold text-3xl text-indigo-600 mb-2">08:15 AM</div>
                                    <div id="ai-description" className="text-sm">Pico de interacción de la audiencia en <b>Instagram</b>. Alta actividad profesional detectada</div>
                                    <hr className="my-5 bg-indigo-600 rounded opacity-20" />
                                    <div id="ai-prediction" className="text-sm text-amber-950">Probabilidad de interacción: <span id="ai-prediction-interaction">+22%</span></div>
                                </Card>
                            </div>
                            
                        </Card>
                    </div>
                </section>
   
            </main>
        </>
    )
}