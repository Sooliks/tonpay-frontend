'use client'
import React from 'react';
import {ThemeToggle} from "@/components/ThemeToggle";
import {useAuth} from "@/hooks/useAuth";
import {Card} from "@/components/ui/card";
import {useTranslation} from "@/hooks/useTranslation";

const SettingsPage = () => {
    const auth = useAuth()
    const {translations} = useTranslation()
    return (
        <div className={'p-4'}>
            <Card className={'p-4'}>
                <h4 className={'text-center scroll-m-20 text-xl font-semibold tracking-tight'}>{translations.profile.settings.title}</h4>
            </Card>
            <ThemeToggle/>
        </div>
    );
};

export default SettingsPage;