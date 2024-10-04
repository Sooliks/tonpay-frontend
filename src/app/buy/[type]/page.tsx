'use client'
import React, {useState} from 'react';
import {Scope} from "@/types/scope";
import SpinLoading from "@/components/my-ui/SpinLoading";
import useSWR from "swr";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";



type BuyLayoutProps = {
    params: {
        type: string
    }
}

const BuyPage = ({params}: BuyLayoutProps) => {
    const { data, error, isLoading, mutate } = useSWR<Scope[]>(`/scopes?type=${params.type}`)
    const [searchTerm, setSearchTerm] = useState<string>('');
    if(isLoading){
        return <SpinLoading/>
    }
    const filteredData = data?.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    //TODO добавить тут в каком типе категории
    return (
        <div className={'flex flex-col p-4'}>
            <Input
                value={searchTerm}
                type="text"
                placeholder="Search"
                onChange={(e)=>setSearchTerm(e.target.value)}
            />
            {filteredData && filteredData.length > 0 ?
                <Accordion type="single" collapsible>
                    {filteredData.map(scope=>
                        <AccordionItem value={scope.name} key={scope.id}>
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