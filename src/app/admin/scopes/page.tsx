'use client'
import React, {useState} from 'react';
import useSWR from "swr";
import {Scope} from "@/types/scope";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import SpinLoading from "@/components/my-ui/SpinLoading";
import CreateScope from "@/app/admin/scopes/CreateScope";
import CreateSubScope from "@/app/admin/scopes/CreateSubScope";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";

const AdminScopesPage = () => {
    const { data, error, isLoading, mutate } = useSWR<Scope[]>('/scopes')
    const [searchTerm, setSearchTerm] = useState<string>('');
    const filteredData = data?.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if(isLoading){
        return <SpinLoading/>
    }
    return (
        <div className={'w-full p-4'}>
            <Input
                value={searchTerm}
                type="text"
                placeholder="Search"
                onChange={(e)=>setSearchTerm(e.target.value)}
                className={'mb-2'}
            />
            <CreateScope onCreated={()=>{mutate(); setSearchTerm('')}}/>
                {filteredData && filteredData.length > 0 ?
                    <Accordion type="single" collapsible>
                        {filteredData.map(scope=>
                            <AccordionItem value={scope.id} key={scope.id}>
                                <AccordionTrigger>{scope.name}<span className={'ml-auto text-sm tracking-widest text-muted-foreground mr-4'}>{scope.type}</span></AccordionTrigger>
                                <AccordionContent>
                                    <CreateSubScope idScope={scope.id} onCreated={mutate}/>
                                    <p className={'text-1xl text-center'}>Sub categories: </p>
                                        {scope.subScopes.length > 0 ?
                                            <div className={'flex'}>
                                                {scope.subScopes.map(subScope=>
                                                    <Badge key={subScope.id} className={'mr-1 mt-2'}>{subScope.name}</Badge>
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