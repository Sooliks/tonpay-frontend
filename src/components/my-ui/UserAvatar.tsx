'use client'
import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";

const UserAvatar = ({photoUrl, nickname, id, link = true, small = false}: {photoUrl: string, nickname: string, id: string, link?: boolean, small?: boolean}) => {
    return (
        link ?
            <Link href={`/profile/${id}`}>
                <div className={'flex items-center'}>
                    <Avatar className={'h-6 w-6'}>
                        <AvatarImage src={photoUrl}/>
                        <AvatarFallback>{nickname[0]}</AvatarFallback>
                    </Avatar>
                    <p className={'text-muted-foreground text-sm ml-2'}>@{nickname}</p>
                </div>
            </Link>
            :
            <div className={'flex items-center'}>
                <Avatar className={!small ? 'h-6 w-6' : 'h-4 w-4'}>
                    <AvatarImage src={photoUrl}/>
                    <AvatarFallback>{nickname[0]}</AvatarFallback>
                </Avatar>
                <p className={'text-muted-foreground text-sm ml-2'}>@{nickname}</p>
            </div>
    );
};

export default UserAvatar;