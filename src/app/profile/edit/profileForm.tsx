"use client"
import Input from "@/components/Input";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { toast } from "sonner"
import { updateProfile } from "./actions";

import { useActionState } from "react";

import { User, IdCard } from "lucide-react";

const initialState: ActionResponse = {
    success: false,
    message: "",
};
interface ProfileFormProps {
    profileData: any; 
}

export default function ProfileForm({ profileData }: ProfileFormProps) {

    const [state, action, isPending] = useActionState(
        updateProfile,
        initialState,
    );

    const router = useRouter();
    useEffect( () => {
        if( state.success && state.message) {
            toast.success(state.message);
            router.refresh();
        }
    },[state.id, router]);

    return (
        <form id="profile-form" action={action}>
        
            <h5 className="flex items-center mb-5">
                <User strokeWidth={2} color="#4F46E5" className="me-2" />{" "}
                Información basica
            </h5>
            <div className="grid grid-cols-2 gap-5 mb-10">
                <input type="hidden" name="userId" value={profileData?.id} />
                <div className="col-span-1">
                    <Input
                        name="name"
                        label="Nombre"
                        placeholder="Nombre completo"
                        defaultValue={profileData?.name ?? ""}
                    />
                </div>
                <div className="col-span-1">
                    <Input
                        name="occupation"
                        label="Titulo profesional / Ocupacion"
                        placeholder=""
                        defaultValue={profileData?.profile?.occupation ?? ""}
                    />
                </div>
                <div className="col-span-2">
                    <Textarea
                        id="bio"
                        name="bio"
                        label="Biografía"
                        placeholder="Escribe una breve biografía..."
                        defaultValue={profileData?.profile?.bio ?? ""}
                    />
                </div>
            </div>

            <h5 className="flex items-center mb-5">
                <IdCard strokeWidth={2} color="#4F46E5" className="me-2" />{" "}
                Informacion de contacto
            </h5>
            <div className="grid grid-cols-2 gap-5">
                <div className="col-span-1">
                    <Input
                        name="email"
                        label="Correo electronico"
                        placeholder=""
                        defaultValue={profileData?.email ?? ""}
                    />
                </div>
                <div className="col-span-1">
                    <Input
                        name="phone"
                        label="Número telefónico"
                        placeholder=""
                        startAdornment={"+56 9"}
                        defaultValue={profileData?.profile?.phone ?? ""}
                    />
                </div>
                <div className="col-span-2">
                    <Input
                        name="address"
                        label="Dirección"
                        placeholder=""
                        defaultValue={profileData?.profile?.address ?? ""}
                    />
                </div>
                <div className="col-span-1">
                    <Input
                        name="city"
                        label="Ciudad"
                        placeholder="Puerto Montt"
                        defaultValue={profileData?.profile?.city ?? ""}
                    />
                </div>
                <div className="col-span-1">
                    <Input
                        name="country"
                        label="País"
                        placeholder="Chile"
                        defaultValue={profileData?.profile?.country ?? ""}
                    />
                </div>
            </div>

            <div className="col-span-12 my-5 flex gap-2 justify-end">
                <Button variant="white" className="h-13">
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    className="h-13"
                    isLoading={isPending}
                >
                    Guardar cambios
                </Button>
            </div>
        </form>
    );
}
