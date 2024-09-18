import axiosInstance from "@/configs/axios";
import {UserType} from "@/types/user-type";



export type LoginResponse = {
    user: UserType
    token: string
}

export const userService = Object.freeze({
    login: async (initData: string) => {
        const response = await axiosInstance.post<LoginResponse>("/auth/login", {
            initData
        })

        return response.data
    },
    getCurrentUser: async () => {
        const response = await axiosInstance.get<UserType>("/auth/me")

        return response.data
    }
})