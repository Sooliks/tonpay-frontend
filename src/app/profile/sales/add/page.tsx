'use client'
import React, {useEffect, useState} from 'react';
import {CreateScope as CreateScopeType, Scope} from "@/types/scope";
import SpinLoading from "@/components/my-ui/SpinLoading";
import useSWR from "swr";
import {Input} from "@/components/ui/input";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import axiosInstance from "@/configs/axios";
import {toast} from "@/hooks/use-toast";
import {AxiosError} from "axios";
import {SaleType} from "@/types/sale";
import {SubScope} from "@/types/subScope";

const SalesAddPage = () => {
    const { data, error, isLoading } = useSWR<Scope[]>('/scopes')
    const [scopes,setScopes] = useState<Scope[]>([]);
    const [subScopes,setSubScopes] = useState<SubScope[]>([]);
    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
        reset,
        getValues,
        setValue
    } = useForm<SaleType>({mode: 'onChange'});
    const [isLoadingSubmit,setIsLoadingSubmit] = useState<boolean>(false)
    const onSubmit: SubmitHandler<SaleType> = async (data) => {
        setIsLoadingSubmit(true)
        axiosInstance.post('/sale', data).then(data=>{
            if(data.status === 201) {
                toast({description: 'Success created!'})
                reset()
            }
        }).finally(()=>{setIsLoadingSubmit(false); reset()}).catch((error: AxiosError)=>{
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: `Error: ${errorMessage}`})
        })
    }
    useEffect(()=>{
        if(data){
            setScopes(data.filter(s=>s.type === getValues('type')))
        }
    },[data])
    /*useEffect(()=>{
        setSubScopes(scopes?.filter(s=>s.id === getValues('scopeId'))[0].subScopes || []);
    },[scopes])*/
    const handleChangeType = (value: string) => setScopes(data?.filter(s=>s.type === value) || [])
    const handleChangeScope = (value: string) => setSubScopes(scopes?.filter(s=>s.id === value)[0].subScopes || [])

    if(isLoading){
        return <SpinLoading/>
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col'}>
            <label htmlFor="text" className={'text-muted-foreground text-sm'}>Enter title</label>
            <Input
                id={'text'}
                type={"text"}
                placeholder={'Title'}
                {...register('title', {required: 'Please enter title'})}
            />
            <label htmlFor="type" className={'text-muted-foreground text-sm'}>Select type</label>
            <Controller
                name="type"
                control={control}
                defaultValue={'pc_games'}
                render={({ field }) => (
                    <Select
                        value={field.value}
                        onValueChange={(e)=>{field.onChange(e); handleChangeType(e);}}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pc_games">PC games</SelectItem>
                            <SelectItem value="mobile_games">Mobile games</SelectItem>
                            <SelectItem value="tg_mini_app_game">TG Mini App</SelectItem>
                            <SelectItem value="social_network">Social network</SelectItem>
                        </SelectContent>
                    </Select>

                )}
            />
            <label htmlFor="scopeId" className={'text-muted-foreground text-sm'}>Select category</label>
            <Controller
                name="scopeId"
                control={control}
                render={({ field }) => (
                    <Select
                        value={field.value}
                        onValueChange={(e)=>{field.onChange(e); handleChangeScope(e);}}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {scopes.map(scope=>
                                <SelectItem key={scope.id} value={scope.id}>{scope.name}</SelectItem>
                            )}
                        </SelectContent>
                    </Select>

                )}
            />
            <label htmlFor="subScopeId" className={'text-muted-foreground text-sm'}>Select sub category</label>
            <Controller
                name="subScopeId"
                control={control}
                render={({ field }) => (
                    <Select
                        value={field.value}
                        onValueChange={(e)=>field.onChange(e)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {subScopes.map(subScope=>
                                <SelectItem key={subScope.id} value={subScope.id}>{subScope.name}</SelectItem>
                            )}
                        </SelectContent>
                    </Select>

                )}
            />
            <Button
                type={'submit'}
                className={'w-52 mt-2'}
                disabled={isLoadingSubmit}
            >
                {isLoadingSubmit && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add
            </Button>
        </form>
    );
};

export default SalesAddPage;