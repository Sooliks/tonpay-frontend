'use client'
import { createContext } from "react";

type TranslationContextType = {
    translations: Record<any, any>; // Типизируйте ваши переводы
    lang: string;
}


export const TranslationContext = createContext<TranslationContextType | null>(null);

export const TranslationProvider = ({children, translations, lang}: {
    children: React.ReactNode;
    translations: Record<string, any>;
    lang: string;
}) => (
    <TranslationContext.Provider value={{ translations, lang }}>
        {children}
    </TranslationContext.Provider>
);