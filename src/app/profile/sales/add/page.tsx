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
import {Textarea} from "@/components/ui/textarea";
import {Badge} from "@/components/ui/badge";

const SalesAddPage = () => {
    const { data, error, isLoading } = useSWR<Scope[]>('/scopes')
    const [scopes,setScopes] = useState<Scope[]>([]);
    const [subScopes,setSubScopes] = useState<SubScope[]>([]);
    const [products,setProducts] = useState<string[]>([]);
    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
        reset,
        getValues,
        watch,
        setValue
    } = useForm<SaleType>({mode: 'onChange'});
    const [isLoadingSubmit,setIsLoadingSubmit] = useState<boolean>(false)
    const onSubmit: SubmitHandler<SaleType> = async (data) => {
        setIsLoadingSubmit(true)
        axiosInstance.post('/sales', {
            price: data.price,
            product: products,
            title: data.title,
            description: data.description,
            subScopeId: data.subScopeId
        }).then(data=>{
            if(data.status === 201) {
                toast({description: 'Success created!'})
                reset({type: '', scopeId: '', subScopeId: ''})
                reset()
            }
        }).finally(() => setIsLoadingSubmit(false)).catch((error: AxiosError)=>{
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: `Error: ${errorMessage}`})
        })
    }
    useEffect(()=>{
        if(data){
            setScopes(data.filter(s=>s.type === getValues('type')))
        }
    },[data])
    const handleChangeType = (value: string) => {
        setScopes(data?.filter(s => s.type === value) || [])
        setValue('subScopeId', '');
        setValue('scopeId', '')
        setSubScopes([])
    }
    const handleChangeScope = (value: string) => {
        setSubScopes(scopes.filter(s=>s.id === value)[0]?.subScopes || [])
        setValue('subScopeId', '');
    }

    const handleProductsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        const productsArray = value.split('\n').filter(item => item.trim() !== '');
        setProducts(productsArray);
    };

    if(isLoading){
        return <SpinLoading/>
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col'}>
            <label htmlFor="title" className={'text-muted-foreground text-sm'}>Enter title</label>
            <Input
                id={'title'}
                type={"text"}
                placeholder={'Title'}
                {...register('title', {required: 'Please enter title'})}
            />
            {errors.title?.message && <p className="text-sm text-muted-foreground text-red-500">{errors.title.message}</p>}
            <label htmlFor="type" className={'text-muted-foreground text-sm mt-2'}>Select type</label>
            <Controller
                name={'type'}
                control={control}
                render={({ field }) => (
                    <Select
                        {...register('type', {required: 'Please select type'})}
                        value={field.value}
                        onValueChange={(e)=>{field.onChange(e); handleChangeType(e)}}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue/>
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
            {errors.type?.message && <p className="text-sm text-muted-foreground text-red-500">{errors.type.message}</p>}
            <label htmlFor="scopeId" className={'text-muted-foreground text-sm mt-2'}>Select category</label>
            <Controller
                name="scopeId"
                control={control}
                render={({ field }) => (
                    <Select
                        {...register('scopeId', {required: 'Please select category'})}
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
            {errors.scopeId?.message && <p className="text-sm text-muted-foreground text-red-500">{errors.scopeId.message}</p>}
            <label htmlFor="subScopeId" className={'text-muted-foreground text-sm mt-2'}>Select sub category</label>
            <Controller
                name="subScopeId"
                control={control}
                render={({ field }) => (
                    <Select
                        {...register('subScopeId', {required: 'Please select sub category'})}
                        value={field.value}
                        onValueChange={(e)=>{field.onChange(e);setValue('subScopeId', e)}}
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
            {errors.subScopeId?.message && <p className="text-sm text-muted-foreground text-red-500">{errors.subScopeId.message}</p>}
            <label htmlFor="description" className={'text-muted-foreground text-sm mt-2'}>Description</label>
            <Textarea
                placeholder="Enter description"
                id="description"
                {...register('description', {required: 'Please enter description'})}
                maxLength={500}
            />
            {errors.description?.message && <p className="text-sm text-muted-foreground text-red-500">{errors.description.message}</p>}
            <label htmlFor="price" className={'text-muted-foreground text-sm mt-2 flex items-center'}>Price in <Badge className={'bg-blue-400 h-4 ml-1'}>TON</Badge></label>
            <Input
                id={'price'}
                type={"number"}
                step="0.01"
                placeholder={'Enter price per piece'}
                {...register('price', {required: 'Please enter price', validate: () => {
                        if (watch('price') < 0.05) {
                            return 'The price cannot be less than 0.05';
                        }
                        if (watch('price') > 1000) {
                            return 'The price cannot be more than 1000 TON';
                        }
                    }})}
            />
            {errors.price?.message && <p className="text-sm text-muted-foreground text-red-500">{errors.price.message}</p>}
            <div className={'flex justify-between mt-2'}>
                <label htmlFor="product" className={'text-muted-foreground text-sm'}>Products (no requirement)</label>
                <p className={'text-sm'}>Count: {products.length}</p>
            </div>
            <Textarea
                placeholder="Enter products from each new line"
                id="product"
                {...register('product')}
                maxLength={500}
                onChange={handleProductsChange}
                className={'h-52'}
            />
            {errors.product?.message && <p className="text-sm text-muted-foreground text-red-500">{errors.product.message}</p>}
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