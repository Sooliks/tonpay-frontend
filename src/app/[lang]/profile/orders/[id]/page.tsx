'use client'
import React, {useEffect, useState} from 'react';
import useSWR from "swr";
import SpinLoading from "@/components/my-ui/SpinLoading";
import {Order} from "@/types/order";
import NotFound from "@/app/[lang]/not-found";
import Link from "next/link";
import {Ban, Check, Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/hooks/useAuth";
import {Card} from "@/components/ui/card";
import axiosInstance from "@/configs/axios";
import {toast} from "@/hooks/use-toast";
import {AxiosError} from "axios";
import ReportDialog from "@/components/my-ui/ReportDialog";
import {useSearchParams} from "next/navigation";
import CreateFeedbackForm from "@/app/[lang]/profile/orders/[id]/CreateFeedbackForm";


type OrderPageProps = {
    params: {
        id: string
    }
}
const OrderPage = ({params}: OrderPageProps) => {
    const { data, error, isLoading, mutate } = useSWR<Order>(`/orders/byid/${params.id}`)
    const [isLoadingConfirm,setIsLoadingConfirm] = useState<boolean>(false)
    const [isLoadingCancel,setIsLoadingCancel] = useState<boolean>(false)
    const [isForAdmin,setIsForAdmin] = useState<boolean>(false)
    const auth = useAuth();
    const searchParams = useSearchParams();
    useEffect(() => {
        const forAdmin = searchParams.get('forAdmin');
        setIsForAdmin(forAdmin === 'true')
    },[searchParams])
    const handleConfirm = () => {
        setIsLoadingConfirm(true)
        axiosInstance.post(auth.user?.role === 'ADMIN' || auth.user?.role === 'CREATOR' ? '/orders/confirm/foradmin' : '/orders/confirm', {orderId: data?.id}).then(res=>{
            if(res.status === 201) {
                toast({description: `Order confirmed`})
                mutate();
            }
        }).finally(() => setIsLoadingConfirm(false)).catch((error: AxiosError)=>{
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: `Error: ${errorMessage}`})
        })
    }
    const handleCancel = () => {
        setIsLoadingCancel(true)
        axiosInstance.post(auth.user?.role === 'ADMIN' || auth.user?.role === 'CREATOR' ? '/orders/cancel/foradmin' : '/orders/cancel', {orderId: data?.id}).then(res=>{
            if(res.status === 201) {
                toast({description: `Order cancelled`})
                mutate();
            }
        }).finally(() => setIsLoadingCancel(false)).catch((error: AxiosError)=>{
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: `Error: ${errorMessage}`})
        })
    }
    if(isLoading){
        return <SpinLoading/>
    }
    if(!data){
        return <NotFound/>
    }
    if(auth.user?.role === 'USER'){
        if(isForAdmin)return <NotFound/>
    }
    return (
        <div className={'p-4 flex flex-col'}>
            <Card className={'p-4'}>
                <h1 className={'text-center'}>Order #{data.id}</h1>
            </Card>
            <Card className={'p-4 mt-2 flex flex-col'}>
                <p>Created at {new Date(data.createdAt).toLocaleDateString()} {new Date(data.createdAt).toLocaleTimeString()}</p>
                <Link href={`/sale/${data.sale?.id}`} className={'text-blue-800'}>Sale</Link>
                <Link href={`/profile/${data.customerId}`} className={'text-blue-800'}>Customer</Link>
                <Link href={`/profile/${data.sellerId}`} className={'text-blue-800'}>Seller</Link>
                <p className={'flex items-center'}>
                    Status:
                    {data.isCompleted ?
                        <Check color={'green'} className={'ml-2'}/>
                        :
                        data.isCancelled ? ' Cancelled' : <span className={'ml-2 flex items-center'}>not completed <Ban color={'red'} className={'ml-2'}/></span>
                    }
                </p>
                <p>Amount: <span className={'ml-auto text-sm tracking-widest text-muted-foreground'}>{data.amount.toFixed(2)} TON</span></p>
                <p>Feedback:
                    {data.feedback ?
                    <Link className={'text-blue-800 ml-2'} href={`/profile/${data.sellerId}/feedbacks`}>Feedback</Link>
                    :
                    auth.user?.id === data.customerId ?
                        <CreateFeedbackForm orderId={data.id}/>
                        :
                        ' Nothing'
                    }
                </p>
                {data.count && <p>Count: {data.count}</p>}
            </Card>
            {!data.isCompleted && !data.isCancelled && <ReportDialog order={data}/>}
            {((!data.isCompleted && !data.isCancelled && data.customerId === auth.user?.id) || (auth.user?.role === 'ADMIN' || auth.user?.role === 'CREATOR')) &&
                <Card className={'p-4 mt-2 flex flex-col items-center'}>
                    <Button onClick={handleConfirm} disabled={isLoadingConfirm}>
                        {isLoadingConfirm && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        Confirm the order
                    </Button>
                    <p className={'text-sm text-muted-foreground mt-1'}>Send money to the seller</p>
                    <p className={'text-destructive text-sm mt-1'}>It will no longer be possible to cancel this action</p>
                </Card>
            }
            {((!data.isCompleted && !data.isCancelled && data.sellerId === auth.user?.id) || (auth.user?.role === 'ADMIN' || auth.user?.role === 'CREATOR')) &&
                <Card className={'p-4 mt-2 flex flex-col items-center'}>
                    <Button onClick={handleCancel} disabled={isLoadingCancel} variant={'destructive'}>
                        {isLoadingCancel && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Cancel order
                    </Button>
                    <p className={'text-sm text-muted-foreground mt-1'}>Refund the money to the buyer</p>
                    <p className={'text-destructive text-sm mt-1'}>It will no longer be possible to cancel this action</p>
                </Card>
            }
        </div>
    );
};

export default OrderPage;