import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Image from "next/image"

export default function Header(){
    return(
        /* header */
        <>
        <div className="flex flex-row gap-5 item-stretch ">
            <div className="info_container basis-1/2 py-20">
                <Badge>SERVICIO PUBLICO GRATUITO</Badge>
                <h1 className="mb-5">Empodera tu presencia digital con <span className="text-indigo-600">inteligencia</span></h1>
                <p className="mb-10">Una herramienta gratuita de la Municipalidad de Puerto Montt para emprendedores. Gestiona tus redes sociales con tecnología de clase mundial para potenciar tu emprendimiento.</p>
                <Button className="font-bold">Activar cuenta gratis</Button>
            </div>
            <div className="image_container basis-1/2 flex md:block hidden  rounded-2xl shadow-lg">
                <Image src="/img/rrss_dark.png" alt="rrss" width={0} height={0} sizes="100vw" className="w-full h-full object-cover overflow-hidden rounded-2xl" priority/>
            </div>
        </div>
        </>
    )
}