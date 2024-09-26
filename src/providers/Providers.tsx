'use client'
import React from 'react';
import {AuthProvider} from "@/providers/AuthProvider";
import {SDKProvider} from "@telegram-apps/sdk-react";
import {ThemeProvider} from "next-themes";
import MyTonConnectUiProvider from "@/providers/MyTonConnectUiProvider";
import {SWRConfig} from "swr";
import axiosInstance from "@/configs/axios";

const fetcher = async (url: string) => {
    const response = await axiosInstance.get(url);
    return response.data;
};
const Providers = ({children}:{children: React.ReactNode}) => {
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
                            {children}
                        </SWRConfig>
                    </AuthProvider>
                </MyTonConnectUiProvider>
            </ThemeProvider>
        </SDKProvider>
    );
};

export default Providers;