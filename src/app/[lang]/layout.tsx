import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers/Providers";
import MenuData from "@/components/MenuData";
import {Toaster} from "@/components/ui/toaster";
import React from "react";
import {Locale} from "@/i18n-config";
import {TranslationProvider} from "@/contexts/TranslationProvider";
import {getDictionary} from "@/dictionaries";
export const metadata: Metadata = {
    robots: 'noindex, nofollow'
};

export default async function RootLayout({children, params}: Readonly<{children: React.ReactNode; params: { lang: Locale } }>) {
    const translations = await getDictionary(params.lang);

    return (
        <html lang={params.lang} className={'dark'}>
            <head>
                <script async src="https://telegram.org/js/telegram-web-app.js"></script>
            </head>
            <body
                className={`antialiased w-screen h-screen overflow-x-hidden`}
            >
            <TranslationProvider translations={translations} lang={params.lang}>
                <Providers>
                    <Toaster/>
                    <MenuData/>
                    {children}
                </Providers>
            </TranslationProvider>
            </body>
        </html>
    );
}
