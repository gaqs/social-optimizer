"use client";

import { useActionState, useEffect, useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SideNav from "@/components/Sidenav";
import Image from "next/image";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Button from "@/components/Button";
import FormError from "@/components/FormError";
import ImageUpload from "./imageUpload";
import PreviewModal from "./previewModal";
import { createPost } from "./action";
import { PLATFORMS } from "@/lib/platforms";
import Switch from "@/components/Switch";

import { Sparkles, Check } from "lucide-react";

const initialState: ActionResponse = {
    success: false,
    message: "",
};

interface PostFormProps {
    editId?: string;
    initialContent?: string;
    initialPlatforms?: string[];
    initialMedia?: string[];
}

export default function PostForm({
    editId,
    initialContent = "",
    initialPlatforms = [],
    initialMedia = [],
}: PostFormProps) {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(
        createPost,
        initialState,
    );

    const [selected, setSelected] = useState<string[]>(initialPlatforms);
    const [content, setContent] = useState(initialContent);
    const [mediaFiles, setMediaFiles] = useState<File[]>([]);
    const [keptMedia, setKeptMedia] = useState<string[]>(initialMedia);
    const [libraryMedia, setLibraryMedia] = useState<string[]>([]);
    const [scheduledDate, setScheduledDate] = useState("");
    const [scheduledTime, setScheduledTime] = useState("");
    const [isScheduling, setIsScheduling] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    // Al publicar, remonta MediaUpload para limpiar sus previews y revocar los object URLs
    const [uploadResetKey, setUploadResetKey] = useState(0);

    useEffect(() => {
        if (state.success && state.message) {
            toast.success(state.message);
            if (editId) {
                router.push("/publications");
                return;
            }
            setContent("");
            setSelected([]);
            setMediaFiles([]);
            setKeptMedia([]);
            setLibraryMedia([]);
            setScheduledDate("");
            setScheduledTime("");
            setIsScheduling(false);
            setIsPreviewOpen(false);
            setUploadResetKey((key) => key + 1);
        }
    }, [state.id]);

    const togglePlatform = (platformId: string) => {
        setSelected((prev) =>
            prev.includes(platformId)
                ? prev.filter((id) => id !== platformId)
                : [...prev, platformId],
        );
    };

    const handleSubmit = (mode: "now" | "schedule") => {
        const formData = new FormData();
        formData.set("content", content);
        selected.forEach((p) => formData.append("platforms", p));
        formData.set("mode", mode);
        formData.set("scheduledDate", scheduledDate);
        formData.set("scheduledTime", scheduledTime);
        if (editId) formData.set("id", editId);
        keptMedia.forEach((p) => formData.append("keepMedia", p));
        libraryMedia.forEach((p) => formData.append("libraryMedia", p));
        mediaFiles.forEach((file) => formData.append("media", file));

        startTransition(() => formAction(formData));
    };

    return (
        <>
            <main className="mx-auto bg-indigo-10 flex bg-slate-50">
                <SideNav />

                <section
                    id="dashboard"
                    className="container py-20 px-20 mt-0 mt-10"
                >
                    <div className="w-fill md:w-[50%]">
                        <h3 className="text-4xl font-bolder mb-3">
                            {editId ? "Editar y Republicar" : "Generador de Post"}
                        </h3>
                        <div className="text-black text-sm mb-5">
                            {editId
                                ? "Ajusta el texto o la imagen y publícalo en las redes que faltan."
                                : "Crea y maneja tu contenido a travez de todas tus plataformas."}
                        </div>
                    </div>

                    <FormError errors={state.errors} />

                    <div id="post-container" className="grid grid-cols-12 gap-5" >
                        <div id="left-post-container" className="col-span-8">

                            <ImageUpload
                                key={uploadResetKey}
                                onMediaReady={(files, paths) => {
                                    setMediaFiles(files);
                                    setKeptMedia(paths.filter((p) => initialMedia.includes(p)));
                                    setLibraryMedia(paths.filter((p) => !initialMedia.includes(p)));
                                }}
                                error={state.errors?.media}
                                existingMedia={initialMedia}
                            />

                            <Card className="mt-5">
                                <div className="uppercase text-neutral-300 font-bold text-sm mb-2">
                                    Espacio creativo
                                </div>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full p-5 h-[500px]"
                                    placeholder="Cual es el menaje para hoy? usa @mensiones o #hastags para incrementar alcance"
                                ></textarea>
                                { state.errors?.content?.map((err) => (
                                    <p key={err} className="text-red-500 text-sm">{err}</p>
                                ))}
                            </Card>
                        </div>

                        <div
                            id="right-post-container"
                            className="col-span-4 grid gap-5"
                        >
                            <Card>
                                <div className="uppercase text-neutral-300 font-bold text-sm mb-2">
                                    Distribuir a
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    {PLATFORMS.map((platform) => {
                                        const isSelected = selected.includes( platform.id );

                                        return (
                                            <div
                                                key={platform.id}
                                                id={platform.id}
                                                onClick={() =>
                                                    togglePlatform(platform.id)
                                                }
                                                className={`flex flex-col items-center p-5 pt-6 border-2 rounded-2xl cursor-pointer relative ${
                                                    isSelected
                                                        ? "border-blue-400 text-blue-500"
                                                        : "border-neutral-300 grayscale text-neutral-500"
                                                }`}
                                            >
                                                {isSelected && (
                                                    <div className="absolute top-1 right-1 bg-blue-400 rounded-full">
                                                        <Check
                                                            color="#fff"
                                                            size={25}
                                                            strokeWidth={4}
                                                            className="p-1"
                                                        />
                                                    </div>
                                                )}

                                                <Image
                                                    src={platform.icon}
                                                    alt={platform.label}
                                                    width={30}
                                                    height={30}
                                                    className={ isSelected ? "" : "opacity-60" }
                                                    priority
                                                />
                                                <div className={`mt-2 text-sm ${isSelected ? "font-bold" : ""}`} >
                                                    {platform.label}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>
                            <Card>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="font-bold text-gray-700">
                                            Programar publicación
                                        </span>
                                        <Switch
                                            checked={isScheduling}
                                            onChange={setIsScheduling}
                                        />
                                    </div>
                                    <div className="px-5 pb-2 pt-2 bg-indigo-50 rounded-3xl">
                                        <label className="uppercase text-xs">
                                            Día publicación
                                        </label>
                                        <Input
                                            type="date"
                                            value={scheduledDate}
                                            disabled={!isScheduling}
                                            className="w-full font-bold p-2 border-none rounded-lg border-neutral-300"
                                            onChange={(e) => setScheduledDate(e.target.value)}
                                        />
                                        {state.errors?.scheduledDate?.map((err) => (
                                            <p key={err} className="text-red-500 text-sm">{err}</p>
                                        ))}
                                    </div>
                                    <div className="px-5 pb-2 pt-2 bg-indigo-50 rounded-3xl">
                                        <label className="uppercase text-xs">
                                            Hora publicación
                                        </label>
                                        <Input
                                            type="time"
                                            value={scheduledTime}
                                            disabled={!isScheduling}
                                            className="w-full font-bold p-2 border-none rounded-lg border-neutral-300"
                                            onChange={(e) => setScheduledTime(e.target.value)}
                                        />
                                        {state.errors?.scheduledTime?.map((err) => (
                                            <p key={err} className="text-red-500 text-sm">{err}</p>
                                        ))}
                                    </div>

                                    <span className="flex flex-row text-amber-700 mt-5 text-sm">
                                        <div className="mr-2">
                                            <Sparkles />
                                        </div>
                                        <div className="font-bold">
                                            {" "}
                                            Recomendado para maximo alcance
                                        </div>
                                    </span>

                                    <div
                                        id="ia-datetime"
                                        className="flex flex-row items-center justify-between p-5 bg-indigo-50 rounded-3xl gap-5"
                                    >
                                        <div className="flex-col">
                                            <div className="font-bold">
                                                {" "}
                                                Hoy, 8:45 PM{" "}
                                            </div>
                                            <div className="text-xs text-neutral-500">
                                                {" "}
                                                Ventana optima para Instagram
                                            </div>
                                        </div>
                                        <div className="text-xs text-amber-600 font-bold rounded-2xl bg-amber-100 p-2">
                                            94% Ia Score
                                        </div>
                                    </div>
                                    <div
                                        id="ia-datetime"
                                        className="flex flex-row items-center justify-between p-5 bg-indigo-50 rounded-3xl gap-5"
                                    >
                                        <div className="flex-col">
                                            <div className="font-bold">
                                                {" "}
                                                Mañana, 10:45 PM{" "}
                                            </div>
                                            <div className="text-xs text-neutral-500">
                                                {" "}
                                                Peak Global
                                            </div>
                                        </div>
                                        <div className="text-xs text-amber-600 font-bold rounded-2xl bg-amber-100 p-2">
                                            88% Ia Score
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <div className="flex flex-col gap-3">
                                <Button
                                    variant="secondary"
                                    className="w-full font-bold"
                                    onClick={() =>
                                        handleSubmit(isScheduling ? "schedule" : "now")
                                    }
                                    disabled={isPending}
                                >
                                    {isScheduling
                                        ? editId
                                            ? "Programar republicación"
                                            : "Programar publicación"
                                        : editId
                                            ? "Republicar ahora"
                                            : "Subir publicación"}
                                </Button>
                                <Button
                                    variant="white"
                                    className="w-full font-bold"
                                    onClick={() => setIsPreviewOpen(true)}
                                    disabled={isPending}
                                >
                                    Previsualizar
                                </Button>
                            </div>
                        </div>
                    </div>

                    {isPreviewOpen && (
                        <PreviewModal
                            content={content}
                            platforms={selected}
                            mediaFiles={mediaFiles}
                            mediaPaths={[...keptMedia, ...libraryMedia]}
                            onClose={() => setIsPreviewOpen(false)}
                        />
                    )}
                </section>
            </main>
        </>
    );
}
