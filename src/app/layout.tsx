debugger
import "@/styles/globals.css";
import { Inter } from 'next/font/google';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
    subsets: ['latin'],
});

export default function HomeLayout({
    children,
}:{
    children: React.ReactNode
}){
    return (
        <html lang="en" className={inter.className}>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>SocialOptimizer</title>
        </head>
        <body>
            <section id="navbar">
                <Navbar />
            </section>
            {children}
            <section id="footer">
                <Footer />
            </section>
        </body>
        </html>
    )
}