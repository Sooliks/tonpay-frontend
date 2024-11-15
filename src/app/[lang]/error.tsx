'use client'
import React from 'react';
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";



const Error = ({error}:{error: Error | null}) => {
    const {back} = useRouter();
    return (
        <div className={'w-screen flex justify-center items-center flex-col'}>
            <p className={'mt-52 flex items-center text-red-800'}>{error?.name}</p>
            <p className={'text-muted-foreground w-60'}>{error?.message}</p>
            <Button size={'sm'} className={'mt-2'} onClick={back}>Back</Button>
        </div>
    );
};

export default Error;