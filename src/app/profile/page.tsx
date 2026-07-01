import SideNav from "@/components/Sidenav";
import Button from "@/components/Button";
import Image from "next/image"
import Card from "@/components/Card";
import Input from "@/components/Input";
import Link from "next/link";

import { getLoggedUser } from "@services/auth"

import { getUserProfile } from "@/services/profile";

import {
    Share2,
    IdCard,
    Link2,
    Unplug,
    ShieldQuestionMark,
    BellDot,
    LockKeyhole,
} from "lucide-react";

export default async function Profile() {
    const user = await getLoggedUser();
    const userProfile = await getUserProfile( user.id );

    return(
        <>
            <main className="mx-auto bg-indigo-10 flex bg-slate-50">
                <SideNav />

                <section id="profile" className="container p-20 mt-10">

                    <div id="profile-portada" className="overflow-hidden h-[300px] rounded-3xl relative">
                        <Image src="/img/portada.jpg" alt="portada" width={1200} height={200} priority className="w-full"/>
                    </div>
                    <div id="profile-top-container" className="flex gap-5 my-5 px-10">
                        <div className="flex flex-none">
                            <div id="profile-avatar" className="-mt-30 w-fit me-5 relative">
                                <Image src="/img/profile.png" alt="avatar" width={180} height={180} priority className="rounded-2xl border-5 border-white"/>
                            </div>
                            <div id="name-container">
                                <h3 id="profile-name" className="font-bold">{ userProfile?.name }</h3>
                                <div id="profile-business" className="text-lg">{ userProfile?.profile?.occupation}</div>
                            </div>
                        </div>
                        
                        <div id="profile-buttons" className="flex flex-grow gap-2 justify-end">
                            <Button variant="secondary" className="h-13">Editar Perfil</Button>
                            <Button variant="primary" className="h-13"><Share2/></Button>
                        </div>
                    </div>

                    <div className="text-neutral-400 mb-5 pe-80"> 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultricies, risus imperdiet aliquet bibendum, risus erat tincidunt risus, id viverra diam turpis a eros. Proin et felis consequat, vestibulum leo vitae, lacinia enim. Aliquam eu posuere tortor, vel imperdiet ante. In blandit rutrum neque, eu varius erat. Aenean euismod metus non ex auctor, id luctus enim vehicula.
                    </div>

                    <div id="profile-details" className="grid grid-cols-12 gap-5">
                        <div className="col-span-8 gap-5">
                            <Card className="bg-indigo-50 h-fit mb-5">
                                <div className="flex items-center mb-5">
                                    <IdCard className="me-2" size={30} color="#4f46e5"/>
                                    <h5>Detalles de la cuenta</h5>
                                </div>
                                <div className="grid grid-cols-12 gap-5 mb-5">
                                    <div className="col-span-8">
                                        <Input label="Correo electronico" type="email" name="email" placeholder="tucorreo@correo.com" className="bg-white" />
                                    </div>
                                    <div className="col-span-4">
                                        <Input label="Teléfono" type="text" name="phone" placeholder="+569 12345678" className="bg-white" />
                                    </div>
                                    <div className="col-span-12">
                                        <Input label="Ubicacion" type="text" name="ubication" placeholder="Puerto Montt" className="bg-white"/>
                                    </div>
                                </div>
                            </Card>

                            <Card className="bg-indigo-50">
                                <div className="flex items-center mb-5">
                                    <IdCard className="me-2" size={30} color="#4f46e5"/>
                                    <h5>Biografia Profesional</h5>
                                </div>
                                <div className="grid grid-cols-1 gap-5 mb-5">
                                    <div className="col-span-1">
                                        <textarea className="w-full h-50 bg-white rounded-xl border-1 border-neutral-300 p-5" placeholder="Esta biografia tiene todo el sentido del mundo"></textarea>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="col-span-4 gap-5">
                            <Card className="bg-indigo-50 mb-5">
                                <div className="flex mb-5">
                                    <h5>Plataformas conectadas</h5>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <Card className="p-0 rounded-3xl">
                                        <div className="flex items-center justify-between gap-5">
                                            <div id="top-card-icon" className="p-5 bg-blue-100 rounded-full w-fit">
                                                <Image src="/img/rrss/facebook.png" alt="rrss" width={20} height={20} sizes="20px" priority/>
                                            </div>
                                            <div className="flex-col">
                                                <div id="rrss-title" className="font-bold">Facebook</div>
                                                <div id="rrss-account">@Alejandrillo</div>
                                            </div>
                                            <div id="rrss-link" className="">
                                                <Link className="text-indigo-600 place-self-end" href="https://www.instagram.com/p/Cq8n9XoLh1e/" target="_blank">
                                                <Link2 className="text-indigo-300 cursor-pointer"/>
                                                </Link>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="p-0 rounded-3xl">
                                        <div className="flex items-center justify-between gap-5">
                                            <div id="top-card-icon" className="p-5 bg-blue-100 rounded-full w-fit">
                                                <Image src="/img/rrss/instagram.png" alt="rrss" width={20} height={20} sizes="20px" priority/>
                                            </div>
                                            <div className="flex-col">
                                                <div id="rrss-title" className="font-bold">Instagram</div>
                                                <div id="rrss-account">@Jano</div>
                                            </div>
                                            <div id="rrss-link" className="">
                                                <Link className="text-indigo-600 place-self-end" href="https://www.instagram.com/p/Cq8n9XoLh1e/" target="_blank">
                                                <Link2 className="text-indigo-300 cursor-pointer"/>
                                                </Link>
                                            </div>
                                        </div>
                                    </Card>
                                    <Link href="/profile/connect">
                                        <Button className="w-full">
                                            <Unplug />Conecta tus plataformas
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                            <Card className="rounded-2xl bg-indigo-900 text-white p-5">
                                <div className="flex mb-5">
                                    <h5>Seguridad & Controles</h5>
                                </div>
                                <ul>
                                    <li>
                                        <Link href="#" className="inline-flex items-center gap-2 mb-5 hover:text-neutral-300">
                                            <ShieldQuestionMark />Opciones de Seguridad
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="inline-flex items-center gap-2 mb-5 hover:text-neutral-300">
                                            <BellDot />Notificaciones
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="" className="inline-flex items-center gap-2 mb-5 hover:text-neutral-300">
                                            <LockKeyhole />Configurar Contraseña
                                        </Link>
                                    </li>
                                </ul>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}