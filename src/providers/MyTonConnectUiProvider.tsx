'use client'
import React from 'react';
import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";
import {useTheme} from "next-themes";

const MyTonConnectUiProvider = ({children}:{children: React.ReactNode}) => {
    const theme = useTheme();
    return (
        <TonConnectUIProvider
            manifestUrl="https://tamaev-tma.vercel.app/tonconnect-manifest.json"
            actionsConfiguration={{
                twaReturnUrl: 'https://t.me/TamaevTokenBot/app',
            }}
            uiPreferences={{
                theme: theme.theme === 'light' ? THEME.LIGHT : THEME.DARK,
                borderRadius: 's',
                colorsSet: {
                    [THEME.DARK]: {
                        connectButton: {
                            background: '#191a19'
                        }
                    }
                },
            }}
        >
            {children}
        </TonConnectUIProvider>
    );
};

export default MyTonConnectUiProvider;