import io, {Socket} from "socket.io-client";

export class SocketService {
    static createConnection(namespace: string) {
        const socket: Socket = io(process.env.NODE_ENV === 'production' ? 'https://sooliks-tonpay-backend-5cf7.twc1.net/' + namespace : 'http://localhost:4200/' + namespace, {
            auth: { token: localStorage.getItem("token")},
        });
        socket.on('connect', () => {
            console.log('connected')
        });
        socket.on('disconnect', () => {
            console.log('disconnected')
        });
        return socket;
    }

}