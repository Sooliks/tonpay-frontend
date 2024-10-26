'use client'
import React from 'react';
import {Message as MessageType} from "@/types/chat/message";
import Image from "next/image";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";

const MessageUi = ({message, meId}:{message: MessageType, meId: string}) => {
    function formatMessageDate(createdAt: Date): string {
        const now = new Date();
        const today = now.toDateString() === createdAt.toDateString();

        if (today) {
            // Показываем только время, если сообщение отправлено сегодня
            return new Intl.DateTimeFormat('en-GB', {
                hour: '2-digit',
                minute: '2-digit'
            }).format(createdAt);
        } else {
            // Показываем дату и время, если сообщение отправлено раньше
            return new Intl.DateTimeFormat('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).format(createdAt);
        }
    }
    return (
        <div
            key={message.id}
            className={`flex ${message.senderId === meId ? 'justify-end' : 'justify-start'}`}
        >
            <div
                className={`p-3 mt-1 rounded-lg max-w-xs ${message.senderId === meId ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            >
                <div className={'flex items-center max-w-56'}>
                    <Avatar className={'h-5 w-5 mr-1'}>
                        <AvatarImage src={message.sender?.photoUrl || ""}/>
                        <AvatarFallback>{message.sender?.nickname[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        {message.isSystemMessage &&
                            <div className={'flex justify-center'}>
                                <Badge variant={'secondary'}>System message</Badge>
                            </div>
                        }
                        <p className={'break-all leading-7 [&:not(:first-child)]:mt-6'}>{message.content}</p>
                    </div>
                </div>
                {message.screens.length > 0 && (
                    <div className="flex space-x-2 mt-2">
                        {message.screens.map((screen, index) =>
                            <Link target={'_blank'} href={`https://res.cloudinary.com/dqggb6cgz/image/upload/${screen}`} key={index}>
                                <Image
                                    src={`https://res.cloudinary.com/dqggb6cgz/image/upload/${screen}`}
                                    alt="photo"
                                    width={100}
                                    height={100}
                                    className="rounded-md"
                                />
                            </Link>
                        )}
                    </div>
                )}
                <Badge className={'mt-2'}>{formatMessageDate(new Date(message.createdAt))}</Badge>
            </div>
        </div>
    );
};

export default MessageUi;