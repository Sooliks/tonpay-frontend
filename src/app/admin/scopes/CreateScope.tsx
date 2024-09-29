'use client'
import React, {useState} from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import axiosInstance from "@/configs/axios";
import {AxiosError} from "axios";
import {toast} from "@/hooks/use-toast";
import {CreateScope as CreateScopeType} from "@/types/scope";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Loader2} from "lucide-react";

const CreateScope = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
        reset
    } = useForm<CreateScopeType>({mode: 'onChange'});
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const onSubmit: SubmitHandler<CreateScopeType> = async (data) => {
        setIsLoading(true)
        axiosInstance.post('/scopes/create', {name: data.name, type: data.type}).then(data=>{
            if(data.status === 201) {
                toast({description: 'Success created!'})
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
            <Controller
                name="type"
                control={control}
                defaultValue={'pc_games'}
                render={({ field }) => (
                    <Select
                        value={field.value}
                        onValueChange={(e)=>field.onChange(e)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pc_games">pc_games</SelectItem>
                            <SelectItem value="mobile_games">mobile_games</SelectItem>
                            <SelectItem value="tg_mini_app_game">tg_mini_app_game</SelectItem>
                            <SelectItem value="tg_mini_app_game">social_network</SelectItem>
                        </SelectContent>
                    </Select>

                )}
            />
            <Button
                color={"primary"}
                type={'submit'}
                className={'ml-2 w-52'}
                disabled={isLoading}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Добавить
            </Button>
        </form>
    );
};

export default CreateScope;