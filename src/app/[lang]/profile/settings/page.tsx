'use client'
import React from 'react';
import {ThemeToggle} from "@/components/ThemeToggle";
import CopyButton from "@/components/my-ui/CopyButton";
import {useAuth} from "@/hooks/useAuth";
import {Card} from "@/components/ui/card";
import {useTranslation} from "@/hooks/useTranslation";

const SettingsPage = () => {
    const auth = useAuth()
    const {translations} = useTranslation()
    return (
        <div className={'p-4'}>
            <h4 className={'text-center scroll-m-20 text-xl font-semibold tracking-tight'}>{translations.profile.settings.title}</h4>
            <div>
                <h6>{translations.profile.settings.theme}</h6>
                <ThemeToggle/>
            </div>
            <Card className={'flex flex-col items-center p-4 mt-4'}>
                <CopyButton refTelegram={false} copyText={`https://t.me/PayOnTonBot/app?startapp=${auth.user?.id}`} textButton={translations.profile.settings.refButton}/>
                <p className={'text-sm text-muted-foreground text-center'}>{translations.frequent.soon}</p>
            </Card>
        </div>
    );
};

export default SettingsPage;