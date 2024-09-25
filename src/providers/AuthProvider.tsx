'use client'
import { ReactNode, useEffect } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import {retrieveLaunchParams, useInitData} from "@telegram-apps/sdk-react";
import {useFetchCurrentUser} from "@/hooks/useFetchCurrentUser";
import {useLoginUser} from "@/hooks/useLoginUser";
import FirstLoading from "@/components/my-ui/FirstLoading";
import Error from "@/app/error";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const initData = useInitData(true);
    const { initDataRaw } = typeof window !== 'undefined' ? retrieveLaunchParams() : { initDataRaw: null };
    const { user, error: fetchCurrentUserError, fetchCurrentUser, setUser, isLoading: isFetchingCurrentUser } = useFetchCurrentUser()
    const { authData, error: loginUserError, loginUser, isLoading: isLoggingIn } = useLoginUser()

    useEffect(() => {
        try {
            fetchCurrentUser()
        }catch (e) {
            
        }
    }, [])

    useEffect(() => {
        try {
            if (!initData?.user) return
            if (!initDataRaw || !initData) return
            if (fetchCurrentUserError && initDataRaw && initData) {
                loginUser(initDataRaw, initData?.startParam || undefined)
            }
        }catch (e) {
            
        }
    }, [fetchCurrentUserError])

    useEffect(() => {
        try {
            if (authData) {
                setUser(authData.user)
                if (typeof window !== 'undefined') {
                    localStorage.setItem("token", authData.token)
                }
            }
        }catch (e) {
            
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