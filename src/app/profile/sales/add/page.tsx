'use client'
import React, {useEffect, useState} from 'react';
import {Scope} from "@/types/scope";
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
import {SubScope} from "@/types/subScope";
import {Textarea} from "@/components/ui/textarea";
import {Badge} from "@/components/ui/badge";
import {CreateSaleType} from "@/types/sale";
import {Separator} from "@/components/ui/separator";
import {Card} from "@/components/ui/card";

const SalesAddPage = () => {
    const { data, error, isLoading } = useSWR<Scope[]>('/scopes')
    const [scopes,setScopes] = useState<Scope[]>([]);
    const [subScopes,setSubScopes] = useState<SubScope[]>([]);
    const [currentSubScope,setCurrentSubScope] = useState<SubScope | undefined>(undefined);
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
    } = useForm<CreateSaleType>({mode: 'onChange'});
    const [isLoadingSubmit,setIsLoadingSubmit] = useState<boolean>(false)
    const onSubmit: SubmitHandler<CreateSaleType> = async (data) => {
        setIsLoadingSubmit(true)
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        formData.append("subScopeId", data.subScopeId);

        if(currentSubScope?.isCurrency) formData.append('currency', data!.currency!.toString())

        products.forEach((item) => {
            formData.append("product[]", item);  // Важно добавить каждый элемент массива
        });
        if (data.images) {
            for (let i = 0; i < data.images.length; i++) {
                formData.append("files", data.images[i]);  // Добавляем файлы в formData
            }
        }
        axiosInstance.post('/sales', formData /*{
            price: data.price,
            product: products,
            title: data.title,
            description: data.description,
            subScopeId: data.subScopeId,
            currency: currentSubScope?.isCurrency ? data.currency : undefined,
            files: data.images
        }*/).then(data=>{
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
    //TODO вместо селектов добавить Combobox
    return (
        <Card className={'p-4 mt-2'}>
            <h1 className={'text-center'}>Add new product</h1>
            <Separator className={'my-1'}/>
            <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col'}>
                <label htmlFor="title" className={'text-muted-foreground text-sm'}>Enter title</label>
                <Input
                    id={'title'}
                    type={"text"}
                    placeholder={'Title'}
                    maxLength={30}
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
                            onOpenChange={(e)=>{
                                if(e) {
                                    if(scopes.length === 0) {
                                        toast({description: 'First, select the type'})
                                    }
                                }
                            }}
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
                            onValueChange={(e)=>{
                                field.onChange(e);
                                setValue('subScopeId', e);
                                setCurrentSubScope(subScopes.filter(s=>s.id === e)[0] || undefined);
                            }}
                            onOpenChange={(e)=>{
                                if(e) {
                                    if(subScopes.length === 0) {
                                        toast({description: 'First, select the category'})
                                    }
                                }
                            }}
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
                {currentSubScope?.isCurrency &&
                    <>
                        <label htmlFor="currency" className={'text-muted-foreground text-sm mt-2 flex items-center'}>
                            Count {currentSubScope.name.toLowerCase()} on sale
                        </label>
                        <Input
                            id={'currency'}
                            type={"number"}
                            step="0.01"
                            placeholder={`Enter count ${currentSubScope.name.toLowerCase()}`}
                            {...register('currency', {required: `Please enter count ${currentSubScope.name.toLowerCase()}`})}
                        />
                        {errors.currency?.message && <p className="text-sm text-muted-foreground text-red-500">{errors.currency?.message}</p>}
                    </>
                }
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
                <label htmlFor="images" className={'text-muted-foreground text-sm mt-2 flex items-center'}>
                    Upload Images (max 3):
                </label>
                <Input
                    type="file"
                    id="images"
                    {...register("images", {
                        validate: {
                            maxFiles: files => files.length <= 3 || "Maximum 3 images."
                        }
                    })}
                    multiple
                />
                {errors.images?.message && <p className="text-sm text-muted-foreground text-red-500">{errors.images.message}</p>}
                <div className={'flex justify-between mt-2'}>
                    <label htmlFor="product" className={'text-muted-foreground text-sm'}>Products (no requirement)</label>
                    <p className={'text-sm mr-2'}>Count: {products.length}</p>
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
                    className={'w-full mt-2'}
                    disabled={isLoadingSubmit}
                    variant={'secondary'}
                >
                    {isLoadingSubmit && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add
                </Button>
            </form>
        </Card>
    );
};

export default SalesAddPage;