'use client'
import React from 'react';
import useSWR from "swr";
import {Sale} from "@/types/sale";
import SpinLoading from "@/components/my-ui/SpinLoading";
import NotFound from "@/app/not-found";
import {Card} from "@/components/ui/card";

type ProfileLayoutProps = {
    params: {
        id: string
    }
}

const SalePage = ({params}: ProfileLayoutProps) => {
    const { data, error, isLoading } = useSWR<Sale>(`/sales/one/${params.id}`)
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
        </div>
    );
};

export default SalePage;