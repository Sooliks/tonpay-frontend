import {SubScope} from "@/types/subScope";
import {UserType} from "@/types/user-type";
import {Feedback} from "@/types/feedback";

export type CreateSaleType = {
    price: number
    product: string
    title: string
    description: string
    subScopeId: string
    scopeId: string
    type: string
    currency?: number
    autoMessage?: string
}

export type UpdateSaleType = {
    price: number
    product: string[]
    title: string
    description: string
    currency?: number
    autoMessage?: string
}

export type Sale = {
    id: string
    createdAt: Date
    user: UserType
    userId: string
    price: number
    product?: string[]
    isPublished: boolean
    isModerating: boolean
    subScopeId: string
    subScope: SubScope
    adminId?: string
    title: string
    description: string
    feedbacks: Feedback[]
    currency?: number
    screenUrls: string[]
    rate?: number
    autoMessage?: string
    lastUp: Date
    autoDelivery?: boolean
}