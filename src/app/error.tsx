'use client'
import React from 'react';
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";


const Error = ({error}:{error: Error}) => {
    const {back} = useRouter();
    return (
        <div className={'w-screen flex justify-center items-center'}>
            <p className={'mt-52 flex items-center text-red-800'}>Error: {error.name}</p>
            <p className={'text-muted-foreground'}>{error.message}</p>
            <Button size={'sm'} className={'mt-2'} onClick={back}>Back</Button>
        </div>
    );
};

export default Error;