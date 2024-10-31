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
import FirstSendMessageDialog from "@/components/my-ui/FirstSendMessageDialog";
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
                    <div>
                        <UserAvatar photoUrl={data?.photoUrl || ''} nickname={data!.nickname} id={params.id} link={false}/>
                        {data?.isOnline ?
                            <p className={'text-muted-foreground text-sm'}>Online now</p>
                            :
                            data && <p className={'text-muted-foreground text-sm'}>Last online: {new Date(data.lastOnline).toLocaleDateString() + ' ' + new Date(data.lastOnline).toLocaleTimeString()}</p>
                        }
                    </div>
                    {data && data.averageRating && <p className={'flex items-center'}>Rating: <Star className={'w-4 h-4 ml-1'}/> {data.averageRating}</p>}
                </div>
                <Separator className={'my-2'}/>
                <FirstSendMessageDialog recipientId={data!.id}/>
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