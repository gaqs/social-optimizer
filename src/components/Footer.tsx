import Link from "next/link";

export default function Footer(){
    return (
        <>
            <div id="footer" className="flex flex-row relative w-full px-4 py-20 md:px-8 lg:px-8 xl:px-8 items-top">
                <div className="basis-4/8">
                    <span className="text-xl font-bold text-indigo-600">Social</span>
                    <span className="text-xl">Optimizer</span>
                    <br />
                    <div className="d-flex w-64 mt-5 text-sm text-gray-500">Un programa de Transformación Digital impulsado por la Municipalidad de Puerto Montt para fortalecer el ecosistema socual y economico de nuestra comuna.</div>
                </div>
                <div className="basis-2/8">
                    <ul className="text-sm">
                        <li className="mb-5"><b>Municipio</b></li>
                        <li className="text-gray-500 mb-1"><Link href="">Portal Municipal</Link></li>
                        <li className="text-gray-500 mb-1"><Link href="">Transperencia</Link></li>
                        <li className="text-gray-500 mb-1"><Link href="">Atencion Vecinal</Link></li>
                        <li className="text-gray-500 mb-1"><Link href="">Oficina de PArtes</Link></li>
                    </ul>
                </div>
                <div className="basis-2/8">
                    <ul className="text-sm">
                        <li className="mb-5"><b>Contacto</b></li>
                        <li className="text-gray-500 mb-1">San Felipe 80, Puerto Montt.</li>
                        <li className="text-gray-500 mb-1">Fono: +562 222 222 222</li>
                        <li className="text-gray-500 mb-1">Email: info@social-optimizer.com</li>
                        <li className="text-gray-500 mb-1">Horario: Lunes a Viernes 9:00 - 18:00</li>
                    </ul>
                </div>
            </div>
            
            <div id="footerer" className="flex flex-row relative w-full px-4 py-5 md:px-8 lg:px-8 xl:px-8 bg-gray-50 text-sm">
                <div className="basis-1/2 gap-5 flex flex-row justify-start">
                    <Link className="underline text-gray-500" href="">Politicas de Privacidad</Link>
                    <Link className="underline text-gray-500" href="">Terminos de Uso Publico</Link> 
                    <Link className="underline text-gray-500" href="">Accesibilidad</Link>
                </div>
                <div className="basis-1/2 justify-end flex text-gray-500">
                © 2026 Ilustre Municipalidad de Puerto Montt. SUBDEL. 
                </div>
            </div>
        </>
    )
}