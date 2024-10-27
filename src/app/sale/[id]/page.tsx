'use client'
import React, {useEffect, useState} from 'react';
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
import Tree from "@/components/my-ui/Tree";
import {getNameByPath} from "@/services/navService";
import FirstSendMessageDialog from "@/components/my-ui/FirstSendMessageDialog";
import parseTextWithLinks from "@/services/linkDetectService";
type ProfileLayoutProps = {
    params: {
        id: string
    }
}

const SalePage = ({params}: ProfileLayoutProps) => {
    const { data, error, isLoading } = useSWR<Sale>(`/sales/one/${params.id}`)
    const [isForAdmin,setIsForAdmin] = useState<boolean>(false)
    const auth = useAuth()
    const searchParams = useSearchParams();
    useEffect(() => {
        const forAdmin = searchParams.get('forAdmin');
        setIsForAdmin(forAdmin === 'true')
    },[searchParams])
    if(isLoading){
        return <SpinLoading/>
    }
    if(auth.user?.role === 'USER'){
        if(isForAdmin)return <NotFound/>
    }
    if(!data){
        return <NotFound/>
    }
    return (
        <div className={'p-4'}>
            <Card className={'p-4'}>
                <h1 className={'scroll-m-20 text-2xl font-semibold tracking-tight'}>{data.title.charAt(0).toUpperCase() + data.title.slice(1)}</h1>
                <Tree
                    forPreview
                    type={{href: `/buy/${data.subScope.scope.type}`, name: getNameByPath(data.subScope.scope.type) || ''}}
                    scope={{href: `/buy/${data.subScope.scope.type}?open=${data.subScope.scope.name}`, name: data.subScope.scope.name}}
                    subScope={{href: `/buy/${data.subScope.scope.type}/${data.subScope.id}`, name: data.subScope.name}}
                />
            </Card>
            {data.screenUrls.length > 0 &&
                <Card className={'p-4 mt-2'}>
                    <SaleScreenshots publicIds={data.screenUrls}/>
                </Card>
            }
            <Card className={'p-4 mt-2'}>
                <p className={'text-muted-foreground'}>Description</p>
                <p className={'text-ellipsis'}>{parseTextWithLinks(data.description)}</p>
            </Card>
            <Card className={'p-4 mt-2 flex justify-between'}>
                <UserAvatar photoUrl={data.user.photoUrl || ""} nickname={data.user.nickname} id={data.userId}/>
                {data.user?.rate &&
                    <p className={'flex items-center'}>
                        Seller rating: <Star className={'w-4 h-4 ml-1'}/> {data.user.rate}
                    </p>
                }
            </Card>
            <Card className={'flex p-4 mt-2 justify-between'}>
                <BuyMenu sale={data}/>
                <FirstSendMessageDialog recipientId={data.userId} small={false}/>
            </Card>
            {isForAdmin && <AdminSaleAction id={data.id}/>}
        </div>
    );
};

export default SalePage;