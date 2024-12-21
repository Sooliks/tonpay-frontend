'use client'
import React from 'react';
import useSWR from "swr";
import {Sale} from "@/types/sale";
import SpinLoading from "@/components/my-ui/SpinLoading";
import SalePreview from "@/components/SalePreview";

const LastSalesPage = () => {
    const { data, error, isLoading } = useSWR<Sale[]>(`/sales/lastsales`)
    if(isLoading){
        return <SpinLoading/>
    }
    return (
        <div className={'p-4'}>
            {/*<h4 className={'text-center scroll-m-20 text-xl font-semibold tracking-tight'}>{translations.menu.main.last20Sales}</h4>*/}
            {data && data.length > 0 ? data.map(sale =>
                    <SalePreview sale={sale} key={sale.id} avatar={true} isProfile={false} rate/>
                )
                :
                <p className={'text-center text-muted-foreground text-2xl mt-24'}>Nothing</p>
            }
        </div>
    );
};

export default LastSalesPage;