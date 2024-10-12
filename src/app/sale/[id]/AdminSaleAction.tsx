'use client'
import React from 'react';
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import axiosInstance from "@/configs/axios";
import {toast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {AxiosError} from "axios";

const AdminSaleAction = ({id}:{id: string}) => {
    const {back} = useRouter()
    const handleAccept = () => {
      
    }
    const handleDecline = () => {
        axiosInstance.delete('sales', {data: {id: id}}).then(res=>{
            if(res.status === 200) {
                toast({description: 'Success deleted'})
                back()
            }
        }).catch((error: AxiosError)=>{
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: `Error: ${errorMessage}`})
        })
    }
    
    return (
        <Card className={'mt-2 p-4'}>
            <h6>Admin actions</h6>
            <div className={'flex'}>
                <Button className={'mr-2'} onClick={handleAccept}>Accept</Button>
                <Button variant={'destructive'} onClick={handleDecline}>Decline</Button>
            </div>
        </Card>
    );
};

export default AdminSaleAction;