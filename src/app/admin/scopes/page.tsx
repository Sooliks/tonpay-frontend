'use client'
import React from 'react';
import useSWR from "swr";
import {Scope} from "@/types/scope";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import SpinLoading from "@/components/my-ui/SpinLoading";
import CreateScope from "@/app/admin/scopes/CreateScope";

const AdminScopesPage = () => {
    const { data, error, isLoading, mutate } = useSWR<Scope[]>('/scopes')
    if(isLoading){
        return <SpinLoading/>
    }
    return (
        <div className={'w-full p-4'}>
            <CreateScope onCreated={()=>mutate()}/>
                {data && data.length > 0 ?
                    <Accordion type="single" collapsible>
                        {data.map(scope=>
                            <AccordionItem value={scope.id} key={scope.id}>
                                <AccordionTrigger>{scope.name}<span className={'ml-auto text-sm tracking-widest text-muted-foreground mr-4'}>{scope.type}</span></AccordionTrigger>
                                <AccordionContent>
                                    {scope ?
                                        <Accordion type="single" collapsible>
                                            {scope.subScopes.map(subScope=>
                                                <AccordionItem value={subScope.id} key={subScope.id}>
                                                    <AccordionTrigger>{subScope.name}</AccordionTrigger>
                                                    <AccordionContent>

                                                    </AccordionContent>
                                                </AccordionItem>
                                            )}
                                        </Accordion>
                                        :
                                        <p className={'text-center'}>Nothing</p>
                                    }
                                </AccordionContent>
                            </AccordionItem>
                        )}
                    </Accordion>
                    :
                    <p className={'text-center'}>Nothing</p>
                }

        </div>
    );
};

export default AdminScopesPage;