import Button from "@/components/Button";

export default function Join(){
    return(
        /* header */
        <>
        <div className="flex flex-col gap-5 item-stretch rounded-3xl bg-indigo-900 text-white text-center p-20">
            <h1>¿Listo para potenciar tu comunidad digital?</h1>
            <span className="text-white my-5">Únete a cientos de emprendedores que ya estan profesionalizando<br />su presencia digital con SocialOptimizer</span>
            <div className="flex flex-row gap-4 justify-center">
                <Button variant="white" className="font-bold">Registrarme Gratis</Button>
                <Button variant="border_white" className="font-bold">Soporte Municipal</Button>
            </div>
            <small className="text-indigo-300 mt-5">
                iniciativa 100% gratuita para residentes de la comuna de puerto montt
            </small>
        </div>
        </>
    )
}