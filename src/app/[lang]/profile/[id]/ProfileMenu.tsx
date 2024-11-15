'use client'
import React, {useEffect, useState} from 'react';
import {usePathname, useRouter} from "next/navigation";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";

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
        const path = pathname.split('/')[4] || '';
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
        </Tabs>
    );
};

export default ProfileMenu;