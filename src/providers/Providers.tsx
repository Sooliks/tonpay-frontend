'use client'
import React, {useEffect} from 'react';
import {AuthProvider} from "@/providers/AuthProvider";
import {SDKProvider} from "@telegram-apps/sdk-react";
import {ThemeProvider} from "next-themes";
import MyTonConnectUiProvider from "@/providers/MyTonConnectUiProvider";
import {SWRConfig} from "swr";
import axiosInstance from "@/configs/axios";
import {TooltipProvider} from "@/components/ui/tooltip";


const fetcher = async (url: string) => {
    const response = await axiosInstance.get(url);
    return response.data;
};
const Providers = ({children}:{children: React.ReactNode}) => {
    useEffect(()=>{
        if (window.Telegram?.WebApp) {
            const webApp = window.Telegram.WebApp;
            webApp.setBackgroundColor("#000000");
            webApp.expand();
            webApp.themeParams.hint_color = "#000000"
            webApp.themeParams.text_color = "#FFFFFF"
            webApp.themeParams.secondary_bg_color = "#000000"
        } else {
            console.error("Telegram.WebApp is not available. Make sure this is opened in Telegram.");
        }

    },[])
    return (
        <SDKProvider acceptCustomStyles>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                disableTransitionOnChange
            >
                <MyTonConnectUiProvider>
                    <AuthProvider>
                        <SWRConfig value={{fetcher: fetcher}}>
                            <TooltipProvider>
                                {children}
                            </TooltipProvider>
                        </SWRConfig>
                    </AuthProvider>
                </MyTonConnectUiProvider>
            </ThemeProvider>
        </SDKProvider>
    );
};

export default Providers;