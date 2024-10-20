'use client'
import React, {useEffect} from 'react';
import {AuthProvider} from "@/providers/AuthProvider";
import {SDKProvider} from "@telegram-apps/sdk-react";
import {ThemeProvider} from "next-themes";
import MyTonConnectUiProvider from "@/providers/MyTonConnectUiProvider";
import {SWRConfig} from "swr";
import axiosInstance from "@/configs/axios";
import {TooltipProvider} from "@/components/ui/tooltip";
import useNotification from "@/hooks/useNotifications";
import {toast} from "@/hooks/use-toast";

const fetcher = async (url: string) => {
    const response = await axiosInstance.get(url);
    return response.data;
};
const Providers = ({children}:{children: React.ReactNode}) => {
    const {notification} = useNotification()
    useEffect(()=>{
        toast({description: notification})
    },[notification])
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