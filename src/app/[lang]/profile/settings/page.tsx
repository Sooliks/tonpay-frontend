'use client'
import React from 'react';
import {ThemeToggle} from "@/components/ThemeToggle";
import {Card} from "@/components/ui/card";
import {useTranslation} from "@/hooks/useTranslation";

const SettingsPage = () => {
    const {translations} = useTranslation()
    return (
        <div className={'p-4'}>
            <Card className={'p-4'}>
                <h4 className={'text-center scroll-m-20 text-xl font-semibold tracking-tight'}>{translations.profile.settings.title}</h4>
            </Card>
            <Card className={'p-4 w-full h-full mt-2'}>
                <Card className={'p-2 flex items-center w-40 justify-center'}>
                    <p className={'mr-2 text-sm text-muted-foreground'}>Theme</p>
                    <ThemeToggle/>
                </Card>
            </Card>
        </div>
    );
};

export default SettingsPage;