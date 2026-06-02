'use client'

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

import Card from "@/components/Card";
import Button from "@/components/Button";

import { MailCheck, Send, MailX, MailQuestionMark, ArrowLeft, CircleQuestionMark, LoaderCircle } from "lucide-react";

export default function VerifyEmail() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState('');

    const errorParam = searchParams.get('error') ?? '';
    const callback = searchParams.get('callback');

    const status = useMemo<'waiting' | 'forbidden' | 'success' | 'error'>(() => {
        if (errorParam === 'EMAIL_NOT_VERIFIED') return 'forbidden';
        if (errorParam === 'INVALID_TOKEN') return 'error';
        if (errorParam === 'TOKEN_EXPIRED') return 'error';
        if (callback) return 'success';
        return 'waiting';
    }, [errorParam, callback]);

    useEffect(() => {
        setEmail(sessionStorage.getItem('pendingEmail') ?? '');

        if (callback) {
            const timer = setTimeout(() => {
                router.push('/login');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [callback, router]);

    async function handleResend() {
        if (!email) return;
        setLoading(true);

        await authClient.sendVerificationEmail({
            email,
            callbackURL: '/verify-email?callback=true',
        }, {
            orRequest: () => {
                setError('Enviando...');
            },
            onError: (ctx) => {
                setError(ctx.error.message ?? 'Error al reenviar el correo de validación');
                setLoading(false);
            },
            onSuccess: () => {
                setError('Correo de validación reenviado. Revisa tu bandeja de entrada.');
                setLoading(false);
            }
        });
    }

    const content = {
        waiting: {
            icon: <MailQuestionMark size={64} className="text-indigo-600" />,
            title: "¡Casi listo! Verifica tu correo electrónico",
            description: <>Hemos enviado un enlace de validación a tu correo electrónico. Por favor, revísalo para activar tu cuenta y comenzar a usar <span className="text-indigo-600 font-bold">Social Optimizer</span></>,
            button: <><Send /> Reenviar correo de validación</>,
        },
        forbidden: {
            icon: <MailQuestionMark size={64} className="text-indigo-600" />,
            title: "Necesitas verificar tu correo electrónico",
            description: <>Hemos detectado que tu correo aun no esta validado. Por favor, revísalo para activar tu cuenta o reenvia la validación para comenzar a usar <span className="text-indigo-600 font-bold">Social Optimizer</span></>,
            button: <><Send /> Reenviar correo de validación</>,
        },
        success: {
            icon: <MailCheck size={64} className="text-indigo-600" />,
            title: "¡Correo validado correctamente!",
            description: "Tu correo electrónico ha sido verificado correctamente.",
            button: <><LoaderCircle className="animate-spin" /> Redireccionando a login...</>,
        },
        error: {
            icon: <MailX size={64} className="text-red-500" />,
            title: "Token inválido o expirado",
            description: "El enlace ya no es válido. Solicita uno nuevo.",
            button: <><Send /> Redireccionando a login...</>,
        }
    }[status];

    return (
        <main className="mx-auto bg-indigo-50 flex">
            <section id="login" className="container py-20 px-20 mt-0 md:mt-20">
                <div className="flex justify-center">
                    <Card className="p-15 w-2xl">
                        <div className="flex flex-col justify-center text-center mb-5">
                            <div className="flex flex-row justify-center mb-10">
                                {content.icon}
                            </div>
                            <h2 className="mb-5 font-bolder">{content.title}</h2>
                            <p className="mb-10">{content.description}</p>
                            <Button variant="primary" className="font-bold" onClick={handleResend} isLoading={loading}>
                                {content.button}
                            </Button>
                            {error &&
                                <div id="error" className="mx-auto bg-red mt-5">
                                    {error}
                                </div>
                            }
                            <hr className="my-10 bg-indigo-600 w-50 h-1 rounded opacity-20 mx-auto" />
                        </div>

                        <div className="flex flex-row justify-center gap-5">
                            <Link href="/">
                                <div className="flex items-center text-indigo-600 gap-1">
                                    <ArrowLeft />
                                    <span>Volver al inicio</span>
                                </div>
                            </Link>
                            <div className="font-bold flex items-center text-neutral-500 gap-1">
                                <CircleQuestionMark />
                                <span>¿Necesitas ayuda?</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </main>
    );
}