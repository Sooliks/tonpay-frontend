'use client'
import React, {useLayoutEffect} from 'react';
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {useAuth} from "@/hooks/useAuth";
import axiosInstance from "@/configs/axios";
import {toast} from "@/hooks/use-toast";
import {AxiosError} from "axios";
import {useFetchCurrentUser} from "@/hooks/useFetchCurrentUser";

const NotificationsToggle = () => {
    const [value,setValue] = React.useState<boolean>(true);
    const {fetchCurrentUser} = useFetchCurrentUser()
    const auth = useAuth();
    useLayoutEffect(() => {
        setValue(auth.user?.notifications || true)
    }, [auth.user]);
    const switchOnServer = async (value: boolean) => {
        axiosInstance.post('/settings/toggle/notifications', {value: value}).then(data=>{

        }).finally(()=>{fetchCurrentUser()}).catch((error: AxiosError)=>{
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: `Error: ${errorMessage}`})
        })
    }
    return (
        <div className="flex items-center space-x-2">
            <Switch
                id="notify-mode"
                checked={value}
                onCheckedChange={(v) => {setValue(v); switchOnServer(v)}}
            />
            <Label htmlFor="notify-mode">Notifications in Telegram</Label>
        </div>
    );
};

export default NotificationsToggle;