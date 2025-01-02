'use client'
import React, {useState} from 'react';
import Link from "next/link";
import {cn} from "@/lib/utils";
import Image from "next/image";

const UserAvatar = ({photoUrl, nickname, id, link = true, small = false, className}: {photoUrl: string, nickname: string, id: string, link?: boolean, small?: boolean, className?: string}) => {
    const [imageError, setImageError] = useState(false);
    return (
        link ?
            <div className={cn(className, 'flex items-center')}>
                <Link href={`/profile/${id}`}>
                    {!imageError ?
                        <Image
                            src={photoUrl}
                            alt={'avatar'}
                            className={cn(!small ? 'h-6 w-6' : 'h-4 w-4', 'z-0 rounded-full')}
                            onError={() => setImageError(true)}
                        />
                        :
                        <div className={cn(!small ? 'h-6 w-6' : 'h-4 w-4', 'z-0 rounded-full bg-gray-500 flex justify-center items-center')}>
                            {nickname[0]}
                        </div>
                    }
                    {/*<Avatar className={cn(!small ? 'h-6 w-6' : 'h-4 w-4', 'z-0')}>
                        <AvatarImage src={photoUrl}/>
                        <AvatarFallback>{nickname[0]}</AvatarFallback>
                    </Avatar>*/}
                </Link>
                {nickname &&
                    <Link href={`/profile/${id}`} className={'text-muted-foreground text-sm ml-2'}>
                        @{nickname}
                    </Link>
                }
            </div>
            :
            <div className={cn(className, 'flex items-center')}>
                {!imageError ?
                    <Image
                        src={photoUrl}
                        alt={'avatar'}
                        className={cn(!small ? 'h-6 w-6' : 'h-4 w-4', 'z-0 rounded-full')}
                        onError={() => setImageError(true)}
                    />
                    :
                    <div className={cn(!small ? 'h-6 w-6' : 'h-4 w-4', 'z-0 rounded-full bg-gray-500 flex justify-center items-center')}>
                        {nickname[0]}
                    </div>
                }
                {/*<Avatar className={cn(!small ? 'h-6 w-6' : 'h-4 w-4', 'z-0')}>
                    <AvatarImage src={photoUrl}/>
                    <AvatarFallback>{nickname[0]}</AvatarFallback>
                </Avatar>*/}
                {nickname && <p className={'text-muted-foreground text-sm ml-2'}>@{nickname}</p>}
            </div>
    );
};

export default UserAvatar;