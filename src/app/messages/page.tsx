'use client'
import React from 'react';
import SpinLoading from "@/components/my-ui/SpinLoading";
import useSWR from "swr";
import {Chat} from "@/types/chat/chat";
import ChatPreview from "@/app/messages/ChatPreview";
import {useAuth} from "@/hooks/useAuth";

const MessagesPage = () => {
    const { data, error, isLoading } = useSWR<Chat[]>(`/chat/dialogs`)
    const auth = useAuth()
    if(isLoading){
        return <SpinLoading/>
    }
    return (
        <div className={'p-4 flex flex-col'}>
            <h1 className={'text-center scroll-m-20 text-xl font-semibold tracking-tight mb-1'}>Messages</h1>
            {data && data.length > 0 ?
                data.map(chat=> <ChatPreview key={chat.id} chat={chat} meUserId={auth.user!.id}/>)
                :
                <p>You dont have any chat rooms</p>
            }
        </div>
    );
};

export default MessagesPage;