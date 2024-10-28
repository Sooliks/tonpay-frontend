import {Sale} from "@/types/sale";
import {UserType} from "@/types/user-type";

export type Order = {
    id: string
    createdAt: Date
    sale: Sale
    customer: UserType
    customerId: string
    isCompleted: boolean
    amount: number
    product?: string
    seller: UserType
    sellerId: string
}