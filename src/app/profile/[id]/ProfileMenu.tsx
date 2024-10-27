'use client'
import React, {useEffect, useState} from 'react';
import {usePathname, useRouter} from "next/navigation";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Pay from "@/app/profile/wallet/Pay";
import Withdrawal from "@/app/profile/wallet/Withdrawal";

export type TabType = {
    title: string | React.ReactNode
    key: string
}

type ProfileMenuProps = {
    tabs: TabType[]
    defaultKey?: string
    idProfile: string
}

const ProfileMenu = ({idProfile, tabs, defaultKey} : ProfileMenuProps) => {
    const [value,setValue] = useState<string>(defaultKey || '/');
    const {push} = useRouter();
    const pathname = usePathname()
    useEffect(()=>{
        const path = pathname.split('/')[3] || '';
        setValue('/' + path)
    },[pathname])
    const handleValueChange = (key: string) => {
        push(`/profile/${idProfile}${key}`)
        setValue(key)
    }
    return (
        <Tabs value={value} defaultValue={'/'} className={'flex flex-col items-center mt-2 w-full'} onValueChange={handleValueChange}>
            <TabsList className={`grid w-full grid-cols-3`}>
                {tabs.map(tab =>
                    <TabsTrigger
                        key={tab.key}
                        value={tab.key}
                    >
                        {tab.title}
                    </TabsTrigger>
                )}
            </TabsList>
            {tabs.map(tab =>
                <TabsContent key={tab.key} value={tab.key}></TabsContent>
            )}
        </Tabs>
    );
};

export default ProfileMenu;