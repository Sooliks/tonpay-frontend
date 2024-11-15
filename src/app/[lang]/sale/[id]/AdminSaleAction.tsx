'use client'
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import axiosInstance from "@/configs/axios";
import {toast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {AxiosError} from "axios";
import {Loader2} from "lucide-react";
import AdminDeclineSaleDialog from "@/app/sale/[id]/AdminDeclineSaleDialog";

const AdminSaleAction = ({id}:{id: string}) => {
    const [isLoadingAccept,setIsLoadingAccept] = useState<boolean>(false);
    const {back} = useRouter()
    const handleAccept = () => {
        setIsLoadingAccept(true)
        axiosInstance.post(`sales/publish/${id}`).then(res=>{
            if(res.status === 201) {
                toast({description: 'Success published'})
                back()
            }
        }).catch((error: AxiosError)=>{
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: `Error: ${errorMessage}`})
        }).finally(()=>setIsLoadingAccept(false))
    }
    return (
        <Card className={'mt-2 p-4'}>
            <h6>Admin actions</h6>
            <div className={'flex'}>
                <Button className={'mr-2'} onClick={handleAccept}>
                    {isLoadingAccept && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Accept
                </Button>
                <AdminDeclineSaleDialog saleId={id}/>
            </div>
        </Card>
    );
};

export default AdminSaleAction;