import React, {useEffect, useState} from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";
import axiosInstance from "@/configs/axios";
import {AxiosError} from "axios";
import {Loader2, Pencil} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Sale, UpdateSaleType} from "@/types/sale";
import {SubmitHandler, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Badge} from "@/components/ui/badge";

const EditSaleDialog = ({data, onSave}:{data: Sale,onSave: () => void}) => {
    const [isLoadingSubmit,setIsLoadingSubmit] = useState<boolean>(false)
    const [isOpen,setIsOpen] = useState<boolean>(false)
    const [products,setProducts] = useState<string[]>(data.product || []);
    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
        reset
    } = useForm<UpdateSaleType>({mode: 'onChange'});
    useEffect(()=>{
        return () => reset()
    },[])
    const onSubmit: SubmitHandler<UpdateSaleType> = async  (updatedSale) => {
        setIsLoadingSubmit(true)
        axiosInstance.post('/sales/update', {
            id: data.id,
            price: Number(updatedSale.price),
            product: products,
            title: updatedSale.title,
            description: updatedSale.description,
            currency: updatedSale.currency ? Number(updatedSale.currency) : undefined,
            autoMessage: updatedSale.autoMessage
        }).then(res=>{
            if(res.status === 201) {
                onSave()
                setIsOpen(false)
                toast({description: `Successfully updated`})
            }
        }).finally(() => setIsLoadingSubmit(false)).catch((error: AxiosError)=>{
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: `Error: ${errorMessage}`})
        })
    }
    const handleProductsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        const productsArray = value.split('\n').filter(item => item.trim() !== '');
        setProducts(productsArray);
    };
    return (
        <Drawer open={isOpen} onOpenChange={(v)=>setIsOpen(v)}>
            <Tooltip delayDuration={200}>
                <TooltipTrigger>
                    <DrawerTrigger asChild>
                        <Button
                            variant="outline" size="icon"
                            onClick={(e)=> e.stopPropagation()}
                        >
                            <Pencil className="h-4 w-4"/>
                        </Button>
                    </DrawerTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Edit sale</p>
                </TooltipContent>
            </Tooltip>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Edit sale</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0 h-96 overflow-y-auto">
                        <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col'}>
                            <label htmlFor="title" className={'text-muted-foreground text-sm'}>Title</label>
                            <Input
                                id={'title'}
                                type={"text"}
                                placeholder={'Title'}
                                maxLength={30}
                                {...register('title', {required: 'Please enter title'})}
                                defaultValue={data.title}
                            />
                            {errors.title?.message && <p className="text-sm text-muted-foreground text-red-500">{errors.title.message}</p>}

                            <label htmlFor="description" className={'text-muted-foreground text-sm mt-2'}>Description</label>
                            <Textarea
                                placeholder="Enter description"
                                id="description"
                                {...register('description', {required: 'Please enter description'})}
                                maxLength={500}
                                defaultValue={data.description}
                            />
                            {errors.description?.message && <p className="text-sm text-muted-foreground text-red-500">{errors.description.message}</p>}

                            {data.subScope.isCurrency &&
                                <>
                                    <label htmlFor="currency" className={'text-muted-foreground text-sm mt-2 flex items-center'}>
                                        Count {data.subScope.name.toLowerCase()} on sale
                                    </label>
                                    <Input
                                        id={'currency'}
                                        type={"number"}
                                        step="0.01"
                                        placeholder={`Enter count ${data.subScope.name.toLowerCase()}`}
                                        defaultValue={data.currency}
                                        {...register('currency', {required: `Please enter count ${data.subScope.name.toLowerCase()}`})}
                                    />
                                    {errors.currency?.message && <p className="text-sm text-muted-foreground text-red-500">{errors.currency?.message}</p>}
                                </>
                            }

                            <label htmlFor="autoMessage" className={'text-muted-foreground text-sm mt-2'}>Auto message (no requirement)</label>
                            <Textarea
                                placeholder="Enter the message that will be automatically sent after purchase"
                                id="autoMessage"
                                {...register('autoMessage')}
                                maxLength={300}
                                defaultValue={data.autoMessage}
                            />
                            {errors.autoMessage?.message && <p className="text-sm text-muted-foreground text-red-500">{errors.autoMessage.message}</p>}

                            <label htmlFor="price" className={'text-muted-foreground text-sm mt-2 flex items-center'}>Price in <Badge className={'bg-blue-400 h-4 ml-1'}>TON</Badge></label>
                            <Input
                                id={'price'}
                                type={"number"}
                                defaultValue={data.price}
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
                                <label htmlFor="product" className={'text-muted-foreground text-sm'}>Products for auto delivery (no requirement)</label>
                                <p className={'text-sm mr-2'}>Count: {products.length}</p>
                            </div>
                            <Textarea
                                placeholder="Enter products from each new line"
                                id="product"
                                {...register('product')}
                                maxLength={500}
                                onChange={handleProductsChange}
                                className={'h-16'}
                                defaultValue={data.product?.join("\n") || undefined}
                            />
                            {errors.product?.message && <p className="text-sm text-muted-foreground text-red-500">{errors.product.message}</p>}
                        </form>
                    </div>
                    <DrawerFooter>
                        <Button onClick={()=>handleSubmit(onSubmit)()} disabled={isLoadingSubmit}>
                            {isLoadingSubmit && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save
                        </Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default EditSaleDialog;