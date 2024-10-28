import {Message} from "@/types/chat/message";
import {UserType} from "@/types/user-type";
import {Sale} from "@/types/sale";

export type Chat = {
    id: string
    createdAt: Date
    messages: Message[]
    users: UserType[]
    lastMessage: Message
    sale?: Sale
}