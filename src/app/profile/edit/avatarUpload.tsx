"use client";

import { useState, useRef, useActionState, useEffect, startTransition } from "react";
import Image from "next/image";
import Cropper, { Point, Area } from "react-easy-crop";
import { Edit2, X } from "lucide-react";
import Button from "@/components/Button";
import Toast from "@/components/Toast";
import { getCroppedImg } from "@/lib/cropImage";
import { authClient } from "@/lib/auth-client";

interface AvatarUploadProps {
    currentAvatar?: string;
    onUploadAction: (
        prevState: ActionResponse,
        formData: FormData
    ) => Promise<ActionResponse>;
}

const initialState: ActionResponse = {
    success: false,
    message: "",
};

export default function AvatarUpload({
    currentAvatar = "/img/profile.png",
    onUploadAction,
}: AvatarUploadProps) {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [avatarPreview, setAvatarPreview] = useState(currentAvatar);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // El upload pasa por useActionState, igual que ProfileForm
    const [state, formAction, isUploading] = useActionState(onUploadAction, initialState);

    useEffect(() => {
        if (state.success) {
            authClient.getSession({ query: { disableCookieCache: true } }).then(() => {
                authClient.$store.notify("$sessionSignal");
            });
            setIsModalOpen(false);
            setImageSrc(null);
        }
    }, [state]);
    
    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImageSrc(reader.result as string);
                setIsModalOpen(true);
            });
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleSaveCrop = async () => {
        if (!imageSrc || !croppedAreaPixels) return;

        const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

        const formData = new FormData();
        formData.append("avatar", croppedBlob, "avatar.jpg");

        // Vista previa instantánea (optimista)
        const newAvatarUrl = URL.createObjectURL(croppedBlob);
        setAvatarPreview(newAvatarUrl);

        // Dispara el action -> actualiza `state` -> el Toast se muestra solo
        startTransition(() => formAction(formData));
    };

    return (
        <>
            <Toast id={state.id} success={state.success} message={state.message} />

            <div id="profile-avatar" className="w-fit me-5 relative mb-5">
                <input
                    type="file"
                    name="avatar"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/gif"
                    className="hidden"
                />

                <div onClick={handleEditClick}
                    className="absolute bg-indigo-600 p-3 rounded-full -bottom-1 -right-1 cursor-pointer hover:bg-indigo-700 transition-colors z-10"
                >
                    <Edit2 color="white" size={20} />
                </div>

                <Image
                    src={avatarPreview}
                    alt="avatar"
                    width={180}
                    height={180}
                    priority
                    className="rounded-2xl border-5 border-white object-cover aspect-square"
                />
            </div>

            {isModalOpen && imageSrc && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative flex flex-col gap-4 shadow-2xl">

                        <div className="flex justify-between items-center pb-3">
                            <h5 className="font-bold text-lg text-gray-800">Recortar Imagen</h5>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="relative w-full h-80 bg-gray-900 rounded-xl overflow-hidden">
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                showGrid={false}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>

                        <div className="flex items-center gap-3 px-2">
                            <span className="text-xs text-gray-500 font-medium">Zoom</span>
                            <input
                                type="range"
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                onChange={(e) => setZoom(Number(e.target.value))}
                                className="w-full accent-indigo-600 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="flex justify-end gap-33 pt-4">
                            <Button
                                variant="white"
                                onClick={() => setIsModalOpen(false)}
                                disabled={isUploading}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleSaveCrop}
                                isLoading={isUploading}
                            >
                                Guardar foto
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}