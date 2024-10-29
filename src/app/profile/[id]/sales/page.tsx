'use client'
import React from 'react';
import useSWR from "swr";
import {Sale} from "@/types/sale";
import SpinLoading from "@/components/my-ui/SpinLoading";
import SalePreview from "@/components/SalePreview";


type ProfilePageProps = {
    params: {
        id: string
    }
}
const SalesPage = ({params}: ProfilePageProps) => {
    const { data, error, isLoading } = useSWR<Sale[]>(`/sales/byuserid/${params.id}`)
    if(isLoading){
        return <SpinLoading/>
    }
    return (
        <div className={'mt-2'}>
            {data && data.length > 0 ? data.map(sale=>
                    <SalePreview sale={sale} key={sale.id} avatar={false} isProfile/>
                )
                :
                <p className={'text-center text-muted-foreground text-2xl mt-24'}>Nothing</p>
            }
        </div>
    );
};

export default SalesPage;