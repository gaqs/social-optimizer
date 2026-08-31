"use client";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Toast from "@/components/Toast";

import { useActionState } from "react";

import { updatePassword } from "./actions";

const initialState: ActionResponse = {
    success: true,
    message: "",
};

export default function PasswordForm({ userId }: any) {
    const [state, action, isPending] = useActionState(
        updatePassword,
        initialState,
    );

    return (
        <form id="password-form" action={action}>

            {state.message && (
                <div className="p-3 rounded-md mb-5 text-sm bg-red-50 text-red-700 border border-red-200">
                    {state.message}
                </div>
            )}

            <div className="grid grid-cols-2 gap-5">
                <input type="hidden" name="userId" value={userId} />
                <div className="col-span-2">
                    <Input type="password" name="oldpassword" label="Contraseña actual" placeholder="" />
                    {state.errors?.oldpassword && (
                        <p className="!text-red-500 text-xs mt-1">
                            {state.errors.oldpassword[0]}
                        </p>
                    )}
                </div>
                <div className="col-span-1">
                    <Input type="password" name="newpassword" label="Nueva contraseña" placeholder="" />
                    {state.errors?.newpassword && (
                        <p className="!text-red-500 text-xs mt-1">
                            {state.errors.newpassword[0]}
                        </p>
                    )}
                </div>
                <div className="col-span-1">
                    <Input type="password" name="repeatpassword" label="Repetir contraseña" placeholder="" />
                    {state.errors?.repeatpassword && (
                        <p className="!text-red-500 text-xs mt-1">
                            {state.errors.repeatpassword[0]}
                        </p>
                    )}
                </div>
            </div>

            <div className="col-span-12 my-5 flex gap-2 justify-end">
                <Button
                    type="submit"
                    variant="primary"
                    className="h-13"
                    isLoading={isPending}
                >
                    Actualizar contraseña
                </Button>
            </div>
        </form>
    );
}
