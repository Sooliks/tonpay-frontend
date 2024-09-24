'use client'
import React from 'react';
import {AuthProvider} from "@/providers/AuthProvider";
import {SDKProvider} from "@telegram-apps/sdk-react";
import {ThemeProvider} from "next-themes";
import MyTonConnectUiProvider from "@/providers/MyTonConnectUiProvider";

const Providers = ({children}:{children: React.ReactNode}) => {
    return (
        <SDKProvider acceptCustomStyles>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                disableTransitionOnChange
            >
                <AuthProvider>
                    <MyTonConnectUiProvider>
                        {children}
                    </MyTonConnectUiProvider>
                </AuthProvider>
            </ThemeProvider>
        </SDKProvider>
    );
};

export default Providers;