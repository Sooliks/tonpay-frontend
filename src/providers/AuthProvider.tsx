'use client'
import { ReactNode, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import {retrieveLaunchParams, useInitData} from "@telegram-apps/sdk-react";
import {useFetchCurrentUser} from "@/hooks/useFetchCurrentUser";
import {useLoginUser} from "@/hooks/useLoginUser";
import FirstLoading from "@/components/my-ui/FirstLoading";
import Error from "@/app/error";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { initDataRaw } = retrieveLaunchParams()
    const initData = useInitData(true);
    const { user, error: fetchCurrentUserError, fetchCurrentUser, setUser, isLoading: isFetchingCurrentUser } = useFetchCurrentUser()
    const { authData, error: loginUserError, loginUser, isLoading: isLoggingIn } = useLoginUser()

    useEffect(() => {
        fetchCurrentUser()
    }, [])

    useEffect(() => {
        if(!initDataRaw || !initData)return
        if(fetchCurrentUserError && initDataRaw) {
            loginUser(initDataRaw,initData?.startParam || undefined)
        }
    }, [fetchCurrentUserError, initDataRaw])

    useEffect(() => {
        if(authData) {
            setUser(authData.user)
            localStorage.setItem("token", authData.token)
        }
    }, [authData])

    const isLoading = isFetchingCurrentUser || isLoggingIn

    const isError = fetchCurrentUserError || loginUserError

    if(user !== undefined) {
        return (
            <AuthContext.Provider value={{ user }}>
                {children}
            </AuthContext.Provider>
        )
    }
    if(isLoading) return <FirstLoading/>
    if(isError) return <Error error={fetchCurrentUserError || loginUserError}/>

    return null
}