'use client'
import React from 'react';
import {Message as MessageType} from "@/types/chat/message";
import Image from "next/image";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";

const MessageUi = ({message, meId}:{message: MessageType, meId: string}) => {
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
                        <p className={'break-all'}>{message.content}</p>
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
                <Badge className={'mt-2'}>{new Date(message.createdAt).toLocaleTimeString()}</Badge>
            </div>
        </div>
    );
};

export default MessageUi;