'use client'
import axiosInstance from "@/configs/axios";
import {UserType} from "@/types/user-type";



export type LoginResponse = {
    user: UserType
    token: string
}

export const userService = {
    login: async (initData: string, refId?: string) => {
        const response = await axiosInstance.post<LoginResponse>("/auth/login", {
            initData,
            refId
        })

        return response.data
    },
    getCurrentUser: async () => {
        const response = await axiosInstance.get<UserType>("/auth/me")

        return response.data
    }
}