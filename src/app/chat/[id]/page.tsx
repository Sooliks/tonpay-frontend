'use client'
import React, {useEffect, useState} from 'react';
import useSWR from "swr";
import {Chat} from "@/types/chat/chat";
import SpinLoading from "@/components/my-ui/SpinLoading";
import InfiniteScroll from "react-infinite-scroll-component";
import {Message} from "@/types/chat/message";
import Image from "next/image";


type ProfileLayoutProps = {
    params: {
        id: string
    }
}
const limit = 10; // Количество сообщений на страницу
const ChatPage = ({params}: ProfileLayoutProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const { data, error, isLoading } = useSWR<Chat>(`/chat/dialogs/${params.id}/messages?skip=${page * limit}&count=${limit}`, {revalidateOnFocus: false})
    // Добавляем новые сообщения в список при изменении данных
    useEffect(() => {
        if (data && data.messages.length > 0) {
            setMessages((prev) => [...data.messages, ...prev]);
        }
        if (data && data.messages.length < limit) {
            setHasMore(false);
        }
    }, [data]);

    const loadMoreMessages = () => {
        setPage((prev) => prev + 1); // Увеличиваем страницу для следующей подгрузки
    };
    if(isLoading){
        return <SpinLoading/>
    }
    if (error) return <div>Error loading messages</div>;

    return (
        <div>
            <InfiniteScroll
                dataLength={messages.length}
                next={loadMoreMessages}
                hasMore={hasMore}
                inverse={true} // Для подгрузки вверх
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
            >
                <div id="scrollableDiv" style={{ height: '400px', overflow: 'auto' }}>
                    {messages.map((message) => (
                        <div key={message.id}>
                            <p>{message.content}</p>
                            {message.screens.map((screen, index) => (
                                <Image key={index} src={`https://res.cloudinary.com/dqggb6cgz/image/upload/${screen}`} alt="attachment" width="100" />
                            ))}
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default ChatPage;