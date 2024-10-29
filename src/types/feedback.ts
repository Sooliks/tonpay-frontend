import {UserType} from "@/types/user-type";
import {Order} from "@/types/order";


export type Feedback = {
    id: string
    createdAt: Date

    userId: string
    user: UserType

    recipientId: string
    recipient: UserType
    rate: number
    text?: string
    order: Order
}
