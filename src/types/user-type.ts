export type UserType = {
    id: string
    createdAt: Date
    telegramId: number
    nickname: string
    role: 'ADMIN' | 'USER' | 'CREATOR'
    refId?: string
    isPremium: boolean
    isBanned: boolean
    money: number
    lastOnline: Date
    photoUrl?: string
    averageRating?: number,
    isOnline?: boolean
    languageCode?: string
    isSubscribed: boolean
}

export enum Role {
    ADMIN,
    USER,
    CREATOR
}