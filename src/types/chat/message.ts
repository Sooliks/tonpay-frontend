import {UserType} from "@/types/user-type";

export type Message = {
    id: string
    content: string
    createdAt: Date
    chatId: string
    senderId: string
    sender: UserType
    screens: string[]
    isSystemMessage?: boolean
}