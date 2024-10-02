'use client'
import React from 'react';
import useSWR from "swr";
import {Scope} from "@/types/scope";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import SpinLoading from "@/components/my-ui/SpinLoading";
import CreateScope from "@/app/admin/scopes/CreateScope";
import CreateSubScope from "@/app/admin/scopes/CreateSubScope";
import {Badge} from "@/components/ui/badge";

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
                                    <CreateSubScope idScope={scope.id} onCreated={mutate}/>
                                    <p className={'text-1xl text-center'}>Sub scopes: </p>
                                        {scope.subScopes.length > 0 ?
                                            <div className={'mt-2 flex'}>
                                                {scope.subScopes.map(subScope=>
                                                    <div key={subScope.id}>
                                                        <Badge>{subScope.name}</Badge>
                                                    </div>
                                                )}
                                            </div>
                                            :
                                            <p className={'text-center text-muted-foreground'}>Nothing</p>
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