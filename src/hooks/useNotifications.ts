import { useEffect, useState } from 'react';
import {SocketService} from "@/services/socketService";

const useNotification = () => {
    const [notification, setNotification] = useState<string>();
    useEffect(() => {
        const socket = SocketService.createConnection('notifications');
        socket.on('notification', (data) => {
            setNotification(data.message);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    return { notification };
};

export default useNotification;
