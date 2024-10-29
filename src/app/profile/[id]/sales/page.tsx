'use client'
import React from 'react';
import useSWR from "swr";
import {Sale} from "@/types/sale";
import SalePreview from "@/components/SalePreview";
import {Skeleton} from "@/components/ui/skeleton";


type ProfilePageProps = {
    params: {
        id: string
    }
}
const SalesPage = ({params}: ProfilePageProps) => {
    const { data, error, isLoading } = useSWR<Sale[]>(`/sales/byuserid/${params.id}`)
    if(isLoading){
        return(
            <div className="flex flex-col space-y-3 mt-2">
                <Skeleton className="h-[125px] w-full rounded-xl"/>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-96"/>
                    <Skeleton className="h-4 w-80"/>
                </div>
            </div>
        )
    }
    return (
        <div className={'mt-2'}>
            {data && data.length > 0 ? data.map(sale =>
                    <SalePreview sale={sale} key={sale.id} avatar={false} isProfile/>
                )
                :
                <p className={'text-center text-muted-foreground text-2xl mt-24'}>Nothing</p>
            }
        </div>
    );
};

export default SalesPage;