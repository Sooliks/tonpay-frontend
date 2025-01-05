'use client'
import React, {useState} from 'react';
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {useAuth} from "@/hooks/useAuth";
import axiosInstance from "@/configs/axios";
import {toast} from "@/hooks/use-toast";
import {AxiosError} from "axios";
import {useFetchCurrentUser} from "@/hooks/useFetchCurrentUser";

const NotificationsToggle = () => {
    const auth = useAuth();
    const [value,setValue] = useState<boolean | undefined>(undefined);
    const {fetchCurrentUser} = useFetchCurrentUser()
    const switchOnServer = (value: boolean) => {
        axiosInstance.post('/settings/toggle/notifications', {value: value}).then(data=>{
            fetchCurrentUser();
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
                defaultChecked={auth.user?.notifications}
                onCheckedChange={(v) => {setValue(v); switchOnServer(v)}}
            />
            <Label htmlFor="notify-mode">Notifications in Telegram</Label>
        </div>
    );
};

export default NotificationsToggle;