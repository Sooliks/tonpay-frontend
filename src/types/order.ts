import {Sale} from "@/types/sale";
import {UserType} from "@/types/user-type";
import {Feedback} from "@/types/feedback";

export type Order = {
    id: string
    createdAt: Date
    sale: Sale
    customer: UserType
    customerId: string
    isCompleted: boolean
    isCancelled: boolean
    amount: number
    product?: string
    seller: UserType
    sellerId: string
    feedback?: Feedback
    feedbackId?: string
    count?: number
}