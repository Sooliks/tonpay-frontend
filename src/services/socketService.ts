import io, {Socket} from "socket.io-client";

export class SocketService {
    static socket: null | Socket = null;
    static createConnection() {
        this.socket = io(process.env.NODE_ENV === 'production' ? 'https://sooliks-tonpay-backend-8ff0.twc1.net' : 'http://localhost:4200', {
            auth: { token: localStorage.getItem("token")},
        });

        this.socket.on('connect', () => {
            console.log('connected')
        });
        this.socket.on('disconnect', () => {
            console.log('disconnected')
        });
        return this.socket;
    }

}