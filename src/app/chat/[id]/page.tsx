'use client'
import React, {useEffect, useRef, useState} from 'react';
import useSWR from "swr";
import {Chat} from "@/types/chat/chat";
import SpinLoading from "@/components/my-ui/SpinLoading";
import InfiniteScroll from "react-infinite-scroll-component";
import {Message} from "@/types/chat/message";
import SendMessageForm from "@/app/chat/[id]/SendMessageForm";
import {useAuth} from "@/hooks/useAuth";
import MessageUi from "@/app/chat/[id]/Message";
import UserAvatar from "@/components/my-ui/UserAvatar";
import {Card} from "@/components/ui/card";
import useChatSocket from "@/hooks/useChatSocket";
import {Skeleton} from "@/components/ui/skeleton";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
type ProfileLayoutProps = {
    params: {
        id: string
    }
}
const limit = 8; // Количество сообщений на страницу
const ChatPage = ({params}: ProfileLayoutProps) => {
    const auth = useAuth()
    const scrollableDivRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [chat,setChat] = useState<Chat | undefined>(undefined)
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const prevMessagesLength = useRef(messages.length);
    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    const { data, error, isLoading } = useSWR<Chat>(`/chat/dialogs/${params.id}/messages?skip=${page * limit}&count=${limit}`, {revalidateOnFocus: false})
    const {message} = useChatSocket();
    useEffect(()=>{
        if(message){
            if(message.chatId === params.id){
                if(message.senderId !== auth.user?.id) {
                    if(!messages.find(m=>m.id === message.id)) {
                        setMessages([...messages, message])
                    }
                }
            }
        }
    },[message])
    const scrollToBottom = () => {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop = 4645636434634346;
        }
    };

    useEffect(() => {
        if (!isLoading && messages.length === 8) {
            scrollToBottom();
        }
    }, [isLoading, messages.length]);
    useEffect(() => {
        if (scrollableDivRef.current) {
            if (messages.length > prevMessagesLength.current) {
                const isAtTop =
                    scrollableDivRef.current.scrollTop <= 120; // Погрешность в 100px
                if (!isAtTop) {
                    if (lastMessageRef.current) {
                        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
                        scrollableDivRef.current.scrollTop = 1256564640;
                    }
                }
            }
            prevMessagesLength.current = messages.length;
        }
    }, [messages]);
    useEffect(() => {
        if (data && data.messages.length > 0) {
            setMessages((prev) => {
                let newMessages = data.messages.filter(newMessage =>
                    !prev.some(existingMessage => existingMessage.id === newMessage.id)
                );
                return [...newMessages.reverse(), ...prev];
            });
            setMessages((prev)=>[...prev].sort((a, b) => {return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()}))
        }
        if (data && data.messages.length < limit) {
            setHasMore(false);
        }
        if(data){
            setChat(data)
        }
    }, [data]);
    const loadMoreMessages = () => {
        setPage((prev) => prev + 1);
    };
    const handleAddNewMessage = (message: Message) => {
        setMessages((prev) => [...prev,message])
    }
    const handleScroll = () => {
        const scrollElement = scrollableDivRef.current;
        if (scrollElement) {
            if (scrollElement.scrollTop === 0 && hasMore) {
                loadMoreMessages(); // Подгружаем новые сообщения, если скролл на верхней позиции
            }
        }
    };

    if(!chat){
        return <SpinLoading/>
    }
    if (error) return <div>Error loading messages</div>;
    let interlocutor = chat!.users.filter(u=>u.id!==auth.user?.id)[0];
    if(!interlocutor)interlocutor = chat!.users[0]
    return (
        <div className="flex flex-col overflow-y-hidden p-4">
            <Card className={'p-4 flex items-center justify-between'}>
                <UserAvatar photoUrl={interlocutor.photoUrl || ""} nickname={interlocutor.nickname} id={interlocutor.id}/>
                {data?.sale &&
                    <Badge className={'text-sm text-ellipsis max-w-56 truncate whitespace-nowrap overflow-hidden'} variant={'outline'}>
                        Wathing <Link href={`/sale/${data.sale.id}`} className={'text-blue-800 ml-2'}>{data.sale.title}</Link>
                    </Badge>
                }
            </Card>
            <Card className={'mb-2 p-4 mt-2'}>
                <div id="scrollableDiv" className="flex-1 overflow-auto h-80 flex-col-reverse" ref={scrollableDivRef} onScroll={handleScroll}>
                    <InfiniteScroll
                        dataLength={messages.length}
                        next={loadMoreMessages}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget="scrollableDiv"
                        inverse
                    >
                        {isLoading &&
                            <div className="space-y-2 my-2">
                                <Skeleton className="h-4 w-full"/>
                                <Skeleton className="h-4 w-full"/>
                            </div>
                        }
                        {messages.map((message, index) =>
                            <div key={message.id} ref={index === messages.length - 1 ? lastMessageRef : null}>
                                <MessageUi message={message} meId={auth.user!.id}/>
                            </div>
                        )}
                        <div ref={scrollableDivRef}/>
                    </InfiniteScroll>
                </div>
            </Card>
            <SendMessageForm
                onMessage={handleAddNewMessage}
                recipientId={interlocutor.id}
            />
        </div>
    );
};

export default ChatPage;