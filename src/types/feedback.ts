import {UserType} from "@/types/user-type";

export type Feedback = {
    id: string
    createdAt: Date
    saleId: string
    user: UserType
    userId: string
    rate: number
    text?: string
}
