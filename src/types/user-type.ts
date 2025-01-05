export type UserType = {
    id: string
    createdAt: Date
    telegramId: number
    nickname: string
    role: Role
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
    isPublishedFirstSale?: boolean
    notifications: boolean
}

export type Role = 'ADMIN' | 'USER' | 'CREATOR'