'use client'
import { useState } from "react"
import {LoginResponse, userService} from "@/services/userService";
import {toast} from "@/hooks/use-toast";


export const useLoginUser = () => {
    const [authData, setAuthData] = useState<LoginResponse | undefined>()
    const [error, setError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const loginUser = async (initData: string, refId?: string) => {
        setIsLoading(true)
        setError(null)

        try {
            const data = await userService.login(initData,refId)
            setAuthData(data)
        } catch (err: any) {
            console.log(err.response.data.message)
            setError(err as Error)
        } finally {
            setIsLoading(false)
        }
    }

    return { authData, error, isLoading, loginUser }
}