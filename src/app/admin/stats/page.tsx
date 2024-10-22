'use client'

import React from 'react';
import useSWR from "swr";
import {UserType} from "@/types/user-type";
import SpinLoading from "@/components/my-ui/SpinLoading";

const Page = () => {
    const { data, error, isLoading } = useSWR<number>(`/stats/currentonline`)
    if(isLoading){
        return <SpinLoading/>
    }
    return (
        <div>
            Current online: {data}
        </div>
    );
};

export default Page;