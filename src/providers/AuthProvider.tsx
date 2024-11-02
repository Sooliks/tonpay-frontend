'use client'
import { ReactNode, useEffect } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import {retrieveLaunchParams, useInitData} from "@telegram-apps/sdk-react";
import {useFetchCurrentUser} from "@/hooks/useFetchCurrentUser";
import {useLoginUser} from "@/hooks/useLoginUser";
import FirstLoading from "@/components/my-ui/FirstLoading";
import Error from "@/app/error";
import {useRouter} from "next/navigation";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const initData = useInitData(true);
    const { initDataRaw } = typeof window !== 'undefined' ? retrieveLaunchParams() : { initDataRaw: null };
    const { user, error: fetchCurrentUserError, fetchCurrentUser, setUser, isLoading: isFetchingCurrentUser } = useFetchCurrentUser()
    const { authData, error: loginUserError, loginUser, isLoading: isLoggingIn } = useLoginUser()
    const {replace} = useRouter();
    useEffect(() => {
        try {
            setInterval(()=>{
                fetchCurrentUser()
            }, 2500)
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
    useEffect(() => {
        if(initData?.startParam){
            const url = parseUrl(initData.startParam)
            if(url)replace(url)
        }
    }, [initData]);
    function parseUrl(query: string): string | null {
        if (query.startsWith('?')) {
            const params = new URLSearchParams(query);
            const page = params.keys().next().value;
            const id = params.get(page || "");
            if (page && id) {
                return `/${page}/${id}`;
            }
        }
        return null;
    }

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