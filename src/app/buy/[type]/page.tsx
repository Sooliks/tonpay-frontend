'use client'
import React, {useEffect, useState} from 'react';
import {Scope} from "@/types/scope";
import SpinLoading from "@/components/my-ui/SpinLoading";
import useSWR from "swr";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";
import {useSearchParams} from "next/navigation";
import {getNameByPath} from "@/services/navService";



type BuyLayoutProps = {
    params: {
        type: string
    }
}

const BuyPage = ({params}: BuyLayoutProps) => {
    const { data, error, isLoading, mutate } = useSWR<Scope[]>(`/scopes?type=${params.type}`)
    const [searchTerm, setSearchTerm] = useState<string>('');
    const searchParams = useSearchParams();
    useEffect(()=>{
        if(searchParams.get('open')){
            setSearchTerm(searchParams.get('open') || "")
        }
    },[searchParams])
    if(isLoading){
        return <SpinLoading/>
    }
    const filteredData = data?.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className={'flex flex-col p-4'}>
            {getNameByPath(params.type) && <h4 className={'text-center scroll-m-20 text-xl font-semibold tracking-tight'}>{getNameByPath(params.type)}</h4>}
            <Input
                value={searchTerm}
                type="text"
                placeholder="Search"
                onChange={(e)=>setSearchTerm(e.target.value)}
                className={'mt-2'}
            />
            {filteredData && filteredData.length > 0 ?
                <Accordion type="single" collapsible defaultValue={searchParams.get('open') || undefined}>
                    {filteredData.map(scope=>
                        <AccordionItem value={scope.name} key={scope.id} defaultValue={'open'}>
                            <AccordionTrigger>{scope.name}</AccordionTrigger>
                            <AccordionContent>
                                {scope.subScopes.map(subScope=>
                                    <Link className={'mr-1'} href={`/buy/${scope.type}/${subScope.id}`} key={subScope.id}>
                                        <Badge variant={'secondary'}>{subScope.name}</Badge>
                                    </Link>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    )}
                </Accordion>
                :
                <p>Nothing</p>
            }
        </div>
    );
};

export default BuyPage;