import React from 'react';
import {ThemeToggle} from "@/components/ThemeToggle";

const SettingsPage = () => {
    return (
        <div className={'p-4'}>
            <h4 className={'text-center scroll-m-20 text-xl font-semibold tracking-tight'}>Settings</h4>
            <ThemeToggle/>
        </div>
    );
};

export default SettingsPage;