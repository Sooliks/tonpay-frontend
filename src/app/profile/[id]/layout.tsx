'use client'
import React from 'react';
import ProfileMenu from "@/app/profile/[id]/ProfileMenu";
import {Card} from "@/components/ui/card";
import UserAvatar from "@/components/my-ui/UserAvatar";
import {UserType} from "@/types/user-type";
import SpinLoading from "@/components/my-ui/SpinLoading";
import useSWR from "swr";

type ProfileLayoutProps = {
    params: {
        id: string
    }
    children: React.ReactNode
}



const ProfileLayout = ({params, children}: ProfileLayoutProps) => {
    const { data, error, isLoading } = useSWR<UserType>(`/profile/${params.id}`)
    if(isLoading){
        return <SpinLoading/>
    }
    return (
        <div className={'p-4'}>
            <Card className={'p-4'}>
                <UserAvatar photoUrl={data?.photoUrl || ''} nickname={data!.nickname} id={params.id} link={false}/>
            </Card>
            <ProfileMenu
                tabs={[
                    {title: 'Sales', key: 'sales'},
                    {title: 'Feedbacks', key: 'feedbacks'}
                ]}
                idProfile={params.id}
            />
            {children}
        </div>
    );
};

export default ProfileLayout;