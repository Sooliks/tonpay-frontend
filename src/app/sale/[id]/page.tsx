'use client'
import React from 'react';
import useSWR from "swr";
import {Sale} from "@/types/sale";
import SpinLoading from "@/components/my-ui/SpinLoading";
import NotFound from "@/app/not-found";
import {Card} from "@/components/ui/card";
import SaleScreenshots from "@/app/sale/[id]/SaleScreenshots";
import UserAvatar from "@/components/my-ui/UserAvatar";
import {Star} from "lucide-react";
import {Button} from "@/components/ui/button";
import BuyMenu from "@/app/sale/[id]/BuyMenu";
import {useSearchParams} from "next/navigation";
import AdminSaleAction from "@/app/sale/[id]/AdminSaleAction";
import {useAuth} from "@/hooks/useAuth";
type ProfileLayoutProps = {
    params: {
        id: string
    }
}

const SalePage = ({params}: ProfileLayoutProps) => {
    const { data, error, isLoading } = useSWR<Sale>(`/sales/one/${params.id}`)
    const auth = useAuth()
    const searchParams = useSearchParams();
    const isForAdmin = searchParams.get('forAdmin') as boolean | null
    if(isForAdmin){
        if(auth.user?.role === 'USER') return <NotFound/>
    }
    if(isLoading){
        return <SpinLoading/>
    }
    if(!data){
        return <NotFound/>
    }
    return (
        <div className={'p-4'}>
            <Card className={'p-4'}>
                <h1 className={'scroll-m-20 text-2xl font-semibold tracking-tight'}>{data.title.charAt(0).toUpperCase() + data.title.slice(1)}</h1>
            </Card>
            {data.screenUrls.length > 0 &&
                <Card className={'p-4 mt-2'}>
                    <SaleScreenshots publicIds={data.screenUrls}/>
                </Card>
            }
            <Card className={'p-4 mt-2'}>
                <p className={'text-muted-foreground'}>Description</p>
                <p>{data.description}</p>
            </Card>
            <Card className={'p-4 mt-2 flex justify-between'}>
                <UserAvatar photoUrl={data.user.photoUrl || ""} nickname={data.user.nickname} id={data.userId}/>
                <p className={'flex items-center'}>Seller rating: <Star className={'w-4 h-4 ml-1'}/> {6}</p>
            </Card>
            <Card className={'flex p-4 mt-2 justify-between'}>
                <Button variant={'secondary'}>To write</Button>
                <BuyMenu sale={data}/>
            </Card>
            {isForAdmin && <AdminSaleAction id={data.id}/>}
        </div>
    );
};

export default SalePage;