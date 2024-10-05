export type Transaction = {
    id: string
    userId: string
    transactionId: string
    confirmed: boolean
    countTon: number
    type: 'PAYMENT' | 'WITHDRAWAL'
    createdAt: Date
}