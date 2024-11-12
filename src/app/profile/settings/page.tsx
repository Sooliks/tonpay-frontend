'use client'
import React from 'react';
import {ThemeToggle} from "@/components/ThemeToggle";
import CopyButton from "@/components/my-ui/CopyButton";
import {useAuth} from "@/hooks/useAuth";
import {Card} from "@/components/ui/card";

const SettingsPage = () => {
    const auth = useAuth()
    return (
        <div className={'p-4'}>
            <h4 className={'text-center scroll-m-20 text-xl font-semibold tracking-tight'}>Settings</h4>
            <div>
                <h6>Theme</h6>
                <ThemeToggle/>
            </div>
            <Card className={'flex flex-col items-center p-4 mt-4'}>
                <CopyButton refTelegram={false} copyText={`https://t.me/PayOnTonBot/app?startapp=${auth.user?.id}`} textButton={'Referral link'}/>
                <p className={'text-sm text-muted-foreground text-center'}>Soon</p>
            </Card>
        </div>
    );
};

export default SettingsPage;