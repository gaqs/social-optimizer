import Image from "next/image";

import SideNav from "@/components/Sidenav";
import Card from "@/components/Card";
import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb";

import PasswordForm from "./passwordForm";
import ProfileForm from "./profileForm";
import AvatarUpload from "./avatarUpload";

import { getUserProfile } from "@/services/profile";
import { getLoggedUser } from "@/services/auth";
import { updateAvatarAction } from "./actions";

import { Edit2, Lightbulb, Lock } from "lucide-react";

export default async function Edit() {

    const user = await getLoggedUser();
    const profileData = await getUserProfile(user.id);

    return (
        <>
            <main className="mx-auto bg-indigo-10 flex bg-slate-50">
                <SideNav />

                <section id="profile-edit" className="container p-20 mt-10">
                    <Breadcrumb separator=">" className="mb-5">
                        <BreadcrumbItem href="/profile" active={false}>
                            Profile
                        </BreadcrumbItem>
                        <BreadcrumbItem active={true}>Edit</BreadcrumbItem>
                    </Breadcrumb>

                    <h4>Editar informacion basica</h4>
                    <div className="text-sm">
                        Manten tu informacion profesional y de contacto
                        actualizada para que los demas usuarios puedan
                        encontrarte y contactarte facilmente.
                    </div>
                    <div className="grid grid-cols-12 gap-5 mt-10">
                        <div className="col-span-4 text-center flex flex-col items-center">

                            <AvatarUpload currentAvatar={profileData?.profile?.avatar ?? "/img/profile.png"} onUploadAction={updateAvatarAction} />
                            
                            <div className="font-bold">Imagen de perfil</div>
                            <div className="text-sm text-neutral-500">
                                JPG, GIF o PNG. Tamaño max 20MB.
                            </div>

                            <div id="expert-tip"
                                className="mt-5 bg-indigo-50 p-5 w-full rounded-xl text-start text-sm"
                            >
                                <div className="flex items-center font-bold text-amber-600 mb-5">
                                    <Lightbulb /> Tip experto
                                </div>
                                <div className="text-neutral-500">
                                    Usa una foto bien iluminada, con fondo
                                    limpio, mirando a la cámara y mostrando una
                                    expresión natural y profesional.
                                </div>
                            </div>
                        </div>

                        <div className="col-span-8">
                            <ProfileForm profileData={profileData} />

                            <Card className="bg-indigo-50">
                                <h5 className="flex items-center mb-5">
                                    <Lock
                                        strokeWidth={2}
                                        color="#4F46E5"
                                        className="me-2"
                                    />{" "}
                                    Cambiar contraseña
                                </h5>

                                <PasswordForm userId={user.id}/>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
