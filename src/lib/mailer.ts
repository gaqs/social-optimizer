import nodemailer from "nodemailer";
import verficationEmailTemplate from "../app/emails/verification-email";
import recoverPasswordTemplate from "../app/emails/recover-password";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});
//parametros definidos
interface sendVerificationMailerParams{
    to: string;
    name: string;
    token: string;
    url: string;
}

export async function sendVerificationMailer({to, name, url}: sendVerificationMailerParams){
    await transporter.sendMail({
        from: "Social Optimizer",
        to,
        subject: "Verifica tu correo electrónico - Social Optimizer",
        html: verficationEmailTemplate({name, url}),
    });
}

export async function sendResetPasswordMailer({to, name, url}: sendVerificationMailerParams){
    await transporter.sendMail({
        from: "Social Optimizer",
        to,
        subject: "Recupera tu contraseña - Social Optimizer",
        html: recoverPasswordTemplate({name, url}),
    });
}