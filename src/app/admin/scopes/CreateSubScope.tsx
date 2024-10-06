'use client'
import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {CreateScope as CreateScopeType} from "@/types/scope";
import axiosInstance from "@/configs/axios";
import {toast} from "@/hooks/use-toast";
import {AxiosError} from "axios";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";

const CreateSubScope = ({idScope, onCreated}:{idScope: string, onCreated: () => void}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
        reset
    } = useForm<{name: string, isCurrency: boolean}>({mode: 'onChange'});
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const onSubmit: SubmitHandler<{name: string, isCurrency: boolean}> = async (data) => {
        setIsLoading(true)
        axiosInstance.post('/scopes/createsubscope', {name: data.name, scopeId: idScope, isCurrency: data.isCurrency}).then(data=>{
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
        <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col"}>
            <Input
                type={"text"}
                placeholder={'Name'}
                {...register('name', {required: 'Please enter name'})}
            />
            <Controller
                name="isCurrency"
                control={control}
                render={({ field }) => (
                    <div className="flex items-center space-x-2 mt-2">
                        <Switch
                            id={'isCurrency'}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className={'w-10'}
                        >
                            {field.value ? 'Currency' : 'Not currency'}
                        </Switch>
                        <Label htmlFor="isCurrency">{field.value ? 'Currency $$$' : 'Not currency'}</Label>
                    </div>
                )}
            />
            <Button
                color={"primary"}
                type={'submit'}
                className={'mt-2'}
                disabled={isLoading}
                variant={'secondary'}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add sub category
            </Button>
        </form>
    );
};

export default CreateSubScope;