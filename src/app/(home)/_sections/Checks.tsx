import Badge from "@/components/Badge";
import Image from "next/image"
import { CircleCheck } from "lucide-react";

export default function Checks(){
    return(
        <>
            <div className="flex flex-row gap-10 mt-10 mb-5">
                <div className="basis-1/2 py-20">
                    <Badge className="mb-5">LABORATORIO DE CONTENIDOS MUNICIPALES</Badge>
                    <h2>Crea contenido impactante en segundos</h2>
                    <ul className="py-15">
                        <li className="mb-5">
                            <h4 className="inline-flex pr-5"><CircleCheck className="text-indigo-600 me-5"/> Formatos Optimizados</h4>
                            <p>Visualiza como se verán tus publicaciones antes de enviarlas a tus redes sociales favoritas.</p>
                        </li>
                        <li>
                            <h4 className="inline-flex"><CircleCheck className="text-indigo-600 me-5" /> Edición Sencilla</h4>
                            <p>Personaliza tus publicaciones con herramientas de edición fáciles de usar, sin necesidad de conocimientos técnicos.</p>
                        </li>
                    </ul>

                </div>
                <div className="basis-1/2 flex">
                    <Image src="/img/rrss_insta.png" alt="rrss" width={0} height={0} sizes="100vw" className="w-full h-full object-cover overflow-hidden rounded-2xl" priority/>
                </div>
            </div>
        </>
    )
}