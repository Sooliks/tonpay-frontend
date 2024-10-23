import { useEffect, useState } from 'react';
import {SocketService} from "@/services/socketService";
import {Message} from "@/types/chat/message";

const useChatSocket = () => {
    const [message, setMessage] = useState<Message>();
    useEffect(() => {
        const socket = SocketService.createConnection('chat');
        socket.on('chat', (data) => {
            setMessage(data.message);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    return { message };
};

export default useChatSocket;
