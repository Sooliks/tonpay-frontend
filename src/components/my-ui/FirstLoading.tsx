'use client'
import React, {useEffect, useState} from 'react';
import {Skeleton} from "@/components/ui/skeleton";
import {ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {Progress} from "@/components/ui/progress";
import {Badge} from "@/components/ui/badge";


const FirstLoading = () => {
    const [valueLoad,setValueLoad] = useState<number>(1)
    useEffect(()=>{
        setInterval(()=>{
            setValueLoad(prev=> prev + 3)
        },16)
    },[])
    return (
        <ResizablePanelGroup
            direction="vertical"
            className="min-h-screen max-w-md p-4"
        >
            <ResizablePanel defaultSize={20}>
                <Skeleton className="flex h-full items-center justify-center">
                    <div className={'text-muted-foreground flex items-center'}><Badge className={'bg-blue-400'}>Pay On Ton</Badge></div>
                </Skeleton>
            </ResizablePanel>
            <ResizablePanel defaultSize={80} className={'mt-2'}>
                <Skeleton className="flex h-full items-center justify-center flex-col">
                    <p className={'text-muted-foreground'}>Pay for yourself</p>
                    <Progress value={valueLoad} className="w-[60%] mt-4"/>
                </Skeleton>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default FirstLoading;