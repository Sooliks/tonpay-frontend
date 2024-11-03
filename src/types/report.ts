import {UserType} from "@/types/user-type";
import {Order} from "@/types/order";

export type Report = {
    id: string;
    order: Order;
    orderId: string;
    userId: string;
    user: UserType;
    text: string;
    createdAt: Date;
    isCompleted: boolean;
    adminId?: string;
    admin?: UserType;
}