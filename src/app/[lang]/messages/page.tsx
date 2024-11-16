'use client'
import React from 'react';
import SpinLoading from "@/components/my-ui/SpinLoading";
import useSWR from "swr";
import {Chat} from "@/types/chat/chat";
import {useAuth} from "@/hooks/useAuth";
import ChatPreview from "@/app/[lang]/messages/ChatPreview";
import {useTranslation} from "@/hooks/useTranslation";

const MessagesPage = () => {
    const { data, error, isLoading } = useSWR<Chat[]>(`/chat/dialogs`)
    const {translations} = useTranslation();
    const auth = useAuth()
    if(isLoading){
        return <SpinLoading/>
    }
    return (
        <div className={'p-4 flex flex-col'}>
            <h1 className={'text-center scroll-m-20 text-xl font-semibold tracking-tight mb-1'}>{translations.messages.title}</h1>
            {data && data.length > 0 ?
                data.map(chat=> <ChatPreview key={chat.id} chat={chat} meUserId={auth.user!.id}/>)
                :
                <p>{translations.messages.nothing}</p>
            }
        </div>
    );
};

export default MessagesPage;