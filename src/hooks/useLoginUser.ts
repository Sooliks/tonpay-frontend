'use client'
import { useState } from "react"
import {LoginResponse, userService} from "@/services/userService";

export const useLoginUser = () => {
    const [authData, setAuthData] = useState<LoginResponse | undefined>()
    const [error, setError] = useState<null | any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const loginUser = async (initData: string, refId?: string) => {
        setIsLoading(true)
        setError(null)

        try {
            const data = await userService.login(initData,refId)
            setAuthData(data)
        } catch (err: any) {
            setError(err)
        } finally {
            setIsLoading(false)
        }
    }

    return { authData, error, isLoading, loginUser }
}