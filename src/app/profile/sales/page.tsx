'use client'
import React from 'react';
import useSWR from "swr";
import {Sale} from "@/types/sale";
import {useAuth} from "@/hooks/useAuth";
import {Card} from "@/components/ui/card";
import SpinLoading from "@/components/my-ui/SpinLoading";
import SalePreview from "@/components/SalePreview";

const SalesPage = () => {
    const auth = useAuth()
    const { data, error, isLoading } = useSWR<Sale[]>(`/sales/?userId=${auth.user?.id}`)
    if(isLoading){
        return <SpinLoading/>
    }
    return (
        <Card className={'p-4 mt-2'}>
            {data && data.length > 0 ? data.map(sale=> <SalePreview sale={sale} key={sale.id}/>)
                :
                <p>Nothing</p>
            }
        </Card>
    );
};

export default SalesPage;