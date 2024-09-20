'use client'
import React from 'react';
import {AuthProvider} from "@/providers/AuthProvider";
import {SDKProvider} from "@telegram-apps/sdk-react";

const Providers = ({children}:{children: React.ReactNode}) => {
    return (
        <SDKProvider acceptCustomStyles>
            <AuthProvider>
                {children}
            </AuthProvider>
        </SDKProvider>
    );
};

export default Providers;