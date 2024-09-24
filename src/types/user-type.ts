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
}

enum Role {
    ADMIN,
    USER,
    CREATOR
}