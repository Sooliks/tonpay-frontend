'use client'
import React, {useEffect} from 'react';
import {AuthProvider} from "@/providers/AuthProvider";
import {SDKProvider, useInitData} from "@telegram-apps/sdk-react";
import {ThemeProvider} from "next-themes";
import MyTonConnectUiProvider from "@/providers/MyTonConnectUiProvider";
import {SWRConfig} from "swr";
import axiosInstance from "@/configs/axios";
import {TooltipProvider} from "@/components/ui/tooltip";
import useNotification from "@/hooks/useNotifications";
import {toast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";

const fetcher = async (url: string) => {
    const response = await axiosInstance.get(url);
    return response.data;
};
const Providers = ({children}:{children: React.ReactNode}) => {
    const {notification} = useNotification()
    const initData = useInitData(true);
    const {replace} = useRouter();
    useEffect(()=>{
        if(notification) toast({description: notification})
    },[notification])
    useEffect(() => {
        if(initData?.startParam){
            const url = parseUrl(initData.startParam)
            if(url)replace(url)
        }
    }, [initData]);
    function parseUrl(query: string): string | null {
        if (query.startsWith('?')) {
            const params = new URLSearchParams(query);
            const page = params.keys().next().value; // Название страницы (например, 'sale')
            const id = params.get(page || ""); // ID страницы

            // Если страница и ID найдены, формируем строку
            if (page && id) {
                return `/${page}/${id}`;
            }
        }
        return null;
    }
    return (
        <SDKProvider acceptCustomStyles>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
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