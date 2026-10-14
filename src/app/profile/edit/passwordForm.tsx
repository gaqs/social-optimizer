"use client";
import Input from "@/components/Input";
import Button from "@/components/Button";
import FormError from "@/components/FormError";

import { toast } from "sonner"

import { useActionState, useEffect  } from "react";

import { updatePassword } from "./actions";

const initialState: ActionResponse = {
    success: false,
    message: "",
};

export default function PasswordForm({ userId }: any) {
    const [state, action, isPending] = useActionState(
        updatePassword,
        initialState,
    );

    useEffect(() => {
        if (state.success && state.message) {
            toast.success(state.message);
        }
    }, [state.id]);
    
    return (
        <>
            <form id="password-form" action={action}>

                <FormError errors={state.errors} />

                <div className="grid grid-cols-2 gap-5">
                    <input type="hidden" name="userId" value={userId} />
                    <div className="col-span-2">
                        <Input type="password" name="oldpassword" label="Contraseña actual" placeholder="" />
                    </div>
                    <div className="col-span-1">
                        <Input type="password" name="newpassword" label="Nueva contraseña" placeholder="" />
                    </div>
                    <div className="col-span-1">
                        <Input type="password" name="repeatpassword" label="Repetir contraseña" placeholder="" />
                    </div>
                </div>

                <div className="col-span-12 my-5 flex gap-2 justify-end">
                    <Button
                        type="submit"
                        variant="primary"
                        className="h-13"
                        isLoading={isPending} >
                        Actualizar contraseña
                    </Button>
                </div>
            </form>
        </>
    );
}
