'use client'
import React from 'react';
import ProfileMenu from "@/app/profile/[id]/ProfileMenu";
import {Card} from "@/components/ui/card";
import UserAvatar from "@/components/my-ui/UserAvatar";
import {UserType} from "@/types/user-type";
import SpinLoading from "@/components/my-ui/SpinLoading";
import useSWR from "swr";
import {Separator} from "@/components/ui/separator";
import {Star} from "lucide-react";
import {Button} from "@/components/ui/button";
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
                <h1>User</h1>
                <Separator className={'mt-2 mb-4'}/>
                <div className={'flex items-center justify-between'}>
                    <UserAvatar photoUrl={data?.photoUrl || ''} nickname={data!.nickname} id={params.id} link={false}/>
                    {data && data.rate && <p className={'flex items-center'}>Rating: <Star className={'w-4 h-4 ml-1'}/> {data.rate}</p>}
                </div>
                <Button size={'sm'} className={'mt-2'}>Send message</Button>
            </Card>
            <ProfileMenu
                tabs={[
                    {title: 'View', key: '/'},
                    {title: 'Sales', key: '/sales'},
                    {title: 'Feedbacks', key: '/feedbacks'}
                ]}
                idProfile={params.id}
                defaultKey={'/'}
            />
            {children}
        </div>
    );
};

export default ProfileLayout;