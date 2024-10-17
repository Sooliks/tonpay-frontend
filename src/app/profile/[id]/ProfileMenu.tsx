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
    const [value,setValue] = useState<string>(defaultKey || '');
    const {push} = useRouter();
    const pathname = usePathname()
    useEffect(()=>{
        setValue(pathname)
    },[pathname])
    const handleValueChange = (key: string) => {
        push(`/profile/${idProfile}/${key}`)
    }
    return (
        <Tabs value={value} defaultValue={defaultKey} className={'w-full mb-2 mt-2'} onValueChange={handleValueChange}>
            <TabsList className={'flex justify-center'}>
                {tabs.map(tab=>
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