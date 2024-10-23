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



type ProfileLayoutProps = {
    params: {
        id: string
    }
}
const limit = 10; // Количество сообщений на страницу
const ChatPage = ({params}: ProfileLayoutProps) => {
    const auth = useAuth()
    const scrollableDivRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [chat,setChat] = useState<Chat | undefined>(undefined)
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const { data, error, isLoading } = useSWR<Chat>(`/chat/dialogs/${params.id}/messages?skip=${page * limit}&count=${limit}`, {revalidateOnFocus: false})
    const {message} = useChatSocket();
    useEffect(()=>{
        if(message){
            if(message.chatId === params.id){
                if(message.senderId !== auth.user?.id) {
                    setMessages([...messages, message])
                }
            }
        }
    },[])
    useEffect(()=>{
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight; // Скроллим до самого низа после нового сообщения
        }
    },[messages])
    useEffect(() => {
        if (data && data.messages.length > 0) {
            setMessages((prev) => [...data.messages.reverse(),...prev]);
        }
        if (data && data.messages.length < limit) {
            setHasMore(false);
        }
        if(data){
            setChat(data)
        }
    }, [data]);
    useEffect(()=>{
        return () => {
            setMessages([])
            setChat(undefined)
        };
    },[])
    useEffect(()=>{
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight; // Скроллим до самого низа после нового сообщения
        }
    },[chat?.id])
    const loadMoreMessages = () => {
        setPage((prev) => prev + 1); // Увеличиваем страницу для следующей подгрузки
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
            <Card className={'p-4'}>
                <UserAvatar photoUrl={interlocutor.photoUrl || ""} nickname={interlocutor.nickname} id={interlocutor.id}/>
            </Card>
            <Card className={'mb-2 p-4 mt-2'}>
                <div id="scrollableDiv" className="flex-1 overflow-auto h-[300px] flex-col-reverse" ref={scrollableDivRef} onScroll={handleScroll}>
                    <InfiniteScroll
                        dataLength={messages.length}
                        next={loadMoreMessages}
                        hasMore={hasMore}
                        loader={isLoading && <h4>Loading...</h4>}
                        scrollableTarget="scrollableDiv"
                        inverse
                    >
                        {messages.map(message => <MessageUi key={message.id} message={message} meId={auth.user!.id}/>)}
                        <div ref={scrollableDivRef} />
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