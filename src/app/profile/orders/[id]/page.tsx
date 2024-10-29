'use client'
import React from 'react';
import useSWR from "swr";
import SpinLoading from "@/components/my-ui/SpinLoading";
import {Order} from "@/types/order";
import NotFound from "@/app/not-found";
import Link from "next/link";
import {Ban, Check} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/hooks/useAuth";
import CreateFeedbackForm from "@/app/profile/orders/[id]/CreateFeedbackForm";


type OrderPageProps = {
    params: {
        id: string
    }
}
const OrderPage = ({params}: OrderPageProps) => {
    const { data, error, isLoading } = useSWR<Order>(`/orders/byid/${params.id}`)
    const auth = useAuth();
    if(isLoading){
        return <SpinLoading/>
    }
    if(!data){
        return <NotFound/>
    }
    return (
        <div className={'p-4 flex flex-col'}>
            <h1 className={'text-center'}>Order #{data.id}</h1>
            <p>Created at {new Date(data.createdAt).toLocaleTimeString()}</p>
            <Link href={`/sale/${data.sale.id}`} className={'text-blue-800'}>Sale</Link>
            <Link href={`/profile/${data.customerId}`} className={'text-blue-800'}>Customer</Link>
            <Link href={`/profile/${data.sellerId}`} className={'text-blue-800'}>Seller</Link>
            <p className={'flex items-center'}>Status: {data.isCompleted ? <Check color={'green'} className={'ml-2'}/> : data.isCancelled ? ' Cancelled' : <Ban color={'red'} className={'ml-2'}/>}</p>
            <p>Amount: <span className={'ml-auto text-sm tracking-widest text-muted-foreground'}>{data.amount.toFixed(2)} TON</span></p>
            <p>Feedback:
                {data.feedback ?
                <Link href={`/feedbacks/${data.feedbackId}`}>Feedback</Link>
                :
                auth.user?.id === data.customerId ?
                    <CreateFeedbackForm/>
                    :
                    'Nothing'
                }
            </p>
        </div>
    );
};

export default OrderPage;