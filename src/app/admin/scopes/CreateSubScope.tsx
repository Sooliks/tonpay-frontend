'use client'
import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {CreateScope as CreateScopeType} from "@/types/scope";
import axiosInstance from "@/configs/axios";
import {toast} from "@/hooks/use-toast";
import {AxiosError} from "axios";

const CreateSubScope = ({idScope, onCreated}:{idScope: string, onCreated: () => void}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
        reset
    } = useForm<CreateScopeType>({mode: 'onChange'});
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const onSubmit: SubmitHandler<{name: string}> = async (data) => {
        setIsLoading(true)
        axiosInstance.post('/scopes/createsubscope', {name: data.name, scopeId: idScope}).then(data=>{
            if(data.status === 201) {
                toast({description: 'Success created!'})
                onCreated()
            }
        }).finally(()=>{setIsLoading(false); reset()}).catch((error: AxiosError)=>{
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: `Error: ${errorMessage}`})
        })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"flex items-center justify-start"}>
            <Input
                type={"text"}
                placeholder={'Name'}
                {...register('name', {required: 'Please enter name'})}
            />
            <Button
                color={"primary"}
                type={'submit'}
                className={'ml-2 w-52'}
                disabled={isLoading}
                variant={'secondary'}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add
            </Button>
        </form>
    );
};

export default CreateSubScope;