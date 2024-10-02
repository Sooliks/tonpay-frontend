'use client'
import React from 'react';
import {Scope} from "@/types/scope";
import SpinLoading from "@/components/my-ui/SpinLoading";
import useSWR from "swr";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";



type BuyLayoutProps = {
    params: {
        type: string
    }
}

const BuyPage = ({params}: BuyLayoutProps) => {
    const { data, error, isLoading, mutate } = useSWR<Scope[]>(`/scopes?type=${params.type}`)
    if(isLoading){
        return <SpinLoading/>
    }

    return (
        <div className={'flex flex-col p-4'}>
            {data && data.length > 0 ?
                <Accordion type="single" collapsible>
                    {data.map(scope=>
                        <AccordionItem value={scope.name} key={scope.id}>
                            <AccordionTrigger>{scope.name}</AccordionTrigger>
                            <AccordionContent>
                                {scope.subScopes.map(subScope=>
                                    <Link href={`/buy/${scope.type}/${subScope.id}`} key={subScope.id}>
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