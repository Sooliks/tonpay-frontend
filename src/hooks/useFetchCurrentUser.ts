'use client'
import { useState } from "react"
import {UserType} from "@/types/user-type";
import {userService} from "@/services/userService";
import {retrieveLaunchParams} from "@telegram-apps/sdk-react";

export const useFetchCurrentUser = () => {
    const [user, setUser] = useState<UserType | undefined>(undefined)
    const [error, setError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { initDataRaw } = typeof window !== 'undefined' ? retrieveLaunchParams() : { initDataRaw: null };

    const fetchCurrentUser = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await userService.getCurrentUser(initDataRaw || "")
            if(JSON.stringify(data) === JSON.stringify(user)) {
                return;
            }
            setUser(data)
        } catch (err) {
            setError(err as Error)
        } finally {
            setIsLoading(false)
        }
    }

    return { user, error, isLoading, fetchCurrentUser, setUser }
}