import Card from "@/components/Card";

import { Earth, Store, Users } from "lucide-react";

export default function Info(){
    return(
        <>
            <div className="flex flex-col text-center">
                <h2 className="mb-3">Tecnología al Servicio de la Comunidad</h2>
                <p>SocialOptimizer es una plataforma de gestión editorial diseñada para conectar, informar y<br />crecer en el entorno digital de manera eficiente y profesional.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-10 mt-10 text-left">
                <div className="md:basis-1/3">
                    <Card mouseOver={true} className="relative">
                        <div className="icon_info p-3 bg-indigo-200 rounded-md text-indigo-600 mb-2 w-fit">
                            <Earth />
                        </div>
                        <b className="mb-2">Impacto Social</b>
                        <p>Herramientas gratuitas para que organizaciones, emprendimientos, amplifiquen su voz en la ciudad.</p>
                    </Card>
                </div>
                <div className="md:basis-1/3">
                    <Card mouseOver={true} className="relative">
                        <div className="icon_info p-3 bg-indigo-200 rounded-md text-indigo-600 mb-2 w-fit">
                            <Store />
                        </div>
                        <b className="mb-2">Apoyo al Emprendimiento</b>
                        <p>Ayudamos a las PYMES locales a profesionalizar su comunicacion digital sin costos de softwares externos.</p>
                    </Card>
                </div>
                <div className="md:basis-1/3">
                    <Card mouseOver={true} className="relative">
                        <div className="icon_info p-3 bg-indigo-200 rounded-md text-indigo-600 mb-2 w-fit">
                            <Users />
                        </div>
                        <b className="mb-2">Red Ciudadana</b>
                        <p>Conectate con las audencias locales en Puertp Montt con información relevante , oportuna y bien diseñada.</p>
                    </Card>
                </div>
            </div>
        </>
    )
}