'use client'
import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {cn} from "@/lib/utils";

const UserAvatar = ({photoUrl, nickname, id, link = true, small = false, className}: {photoUrl: string, nickname: string, id: string, link?: boolean, small?: boolean, className?: string}) => {
    return (
        link ?
            <div className={cn(className, 'flex items-center')}>
                <Link href={`/profile/${id}`}>
                    <Avatar className={cn(!small ? 'h-6 w-6' : 'h-4 w-4', 'z-0')}>
                        <AvatarImage src={photoUrl}/>
                        <AvatarFallback>{nickname[0]}</AvatarFallback>
                    </Avatar>
                </Link>
                <Link href={`/profile/${id}`} className={'text-muted-foreground text-sm ml-2'}>
                    @{nickname}
                </Link>
            </div>
            :
            <div className={cn(className, 'flex items-center')}>
                <Avatar className={cn(!small ? 'h-6 w-6' : 'h-4 w-4', 'z-0')}>
                    <AvatarImage src={photoUrl}/>
                    <AvatarFallback>{nickname[0]}</AvatarFallback>
                </Avatar>
                <p className={'text-muted-foreground text-sm ml-2'}>@{nickname}</p>
            </div>
    );
};

export default UserAvatar;