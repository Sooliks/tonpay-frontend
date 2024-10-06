'use client'
import React from 'react';
import useSWR from "swr";
import {Sale} from "@/types/sale";
import SpinLoading from "@/components/my-ui/SpinLoading";
import NotFound from "@/app/not-found";

type ProfileLayoutProps = {
    params: {
        id: string
    }
}

const SalePage = ({params}: ProfileLayoutProps) => {
    const { data, error, isLoading } = useSWR<Sale>(`/sales/?id=${params.id}`)
    if(isLoading){
        return <SpinLoading/>
    }
    if(!data){
        return <NotFound/>
    }
    return (
        <div>
            {data.description}
        </div>
    );
};

export default SalePage;