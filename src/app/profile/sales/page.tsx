'use client'
import React from 'react';
import useSWR from "swr";
import {Sale} from "@/types/sale";
import {useAuth} from "@/hooks/useAuth";
import {Card} from "@/components/ui/card";
import SpinLoading from "@/components/my-ui/SpinLoading";

const SalesPage = () => {
    const auth = useAuth()
    const { data, error, isLoading } = useSWR<Sale[]>(`/sales/?userId=${auth.user?.id}`)
    if(isLoading){
        return <SpinLoading/>
    }
    return (
        <Card className={'p-4 mt-2'}>
            продажи тут
        </Card>
    );
};

export default SalesPage;