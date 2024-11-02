'use client'
import React from 'react';
import {Chat} from "@/types/chat/chat";
import {Card} from "@/components/ui/card";
import UserAvatar from "@/components/my-ui/UserAvatar";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";

const ChatPreview = ({chat, meUserId}:{chat: Chat, meUserId: string}) => {
    let interlocutor = chat.users.filter(u=>u.id!==meUserId)[0];
    if(!interlocutor)interlocutor = chat.users[0]
    if(!chat.lastMessage)return null;
    const isAdmin = interlocutor.role === 'ADMIN' || interlocutor.role === 'CREATOR';
    return (
        <Link href={`/chat/${chat.id}`} className={'mb-2'}>
            <Card className={'p-4 w-full'}>
                <div className={'flex items-center justify-between'}>
                    <UserAvatar
                        photoUrl={interlocutor.photoUrl || ""}
                        nickname={interlocutor.nickname}
                        id={interlocutor.id}
                        link={false}
                    />
                    {isAdmin && <p className={'text-sm text-muted-foreground'}>admin</p>}
                </div>
                <Separator className={'my-1'}/>
                <div className={'ml-4'}>
                    <UserAvatar
                        photoUrl={chat.lastMessage.sender.photoUrl || ""}
                        nickname={chat.lastMessage.sender.nickname}
                        id={chat.lastMessage.sender.id}
                        link={false}
                        small={true}
                    />
                    <p className={'ml-1 text-sm text-ellipsis max-w-56 truncate whitespace-nowrap overflow-hidden'}>{chat.lastMessage.content || 'File'}</p>
                </div>
            </Card>
        </Link>
    );
};

export default ChatPreview;