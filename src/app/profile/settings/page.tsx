'use client'
import React from 'react';
import {ThemeToggle} from "@/components/ThemeToggle";
import CopyButton from "@/components/my-ui/CopyButton";
import {useAuth} from "@/hooks/useAuth";

const SettingsPage = () => {
    const auth = useAuth()
    return (
        <div className={'p-4'}>
            <h4 className={'text-center scroll-m-20 text-xl font-semibold tracking-tight'}>Settings</h4>
            <div>
                <h6>Theme</h6>
                <ThemeToggle/>
            </div>
            <div className={'flex justify-center'}>
            <CopyButton refTelegram={false} className={'mt-4'} copyText={`https://t.me/PayOnTonBot/app?startapp=${auth.user?.id}`} textButton={'Referral link'}/>
            </div>
        </div>
    );
};

export default SettingsPage;