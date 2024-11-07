'use client'
import React, {useState} from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {Sale} from "@/types/sale";
import axiosInstance from "@/configs/axios";
import {toast} from "@/hooks/use-toast";
import {AxiosError} from "axios";


const DeleteSaleDialog = ({sale, onDelete}:{sale: Sale, onDelete?: () => void}) => {
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [isOpen,setIsOpen] = useState<boolean>(false)
    const handleDelete = () => {
        setIsLoading(true)
        axiosInstance.delete('sales/deleteforuser', {data: {id: sale.id}}).then(res=>{
            if(res.status === 200) {
                toast({description: 'Success'})
                if(onDelete)onDelete();
            }
        }).catch((error: AxiosError)=>{
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: `Error: ${errorMessage}`})
        }).finally(()=>setIsLoading(false))
    }
    return (
        <Drawer open={isOpen} onOpenChange={(v)=>setIsOpen(v)}>
            <DrawerTrigger asChild>
                <Button
                    className={'mt-2'}
                    variant={'outline'}
                    size={'sm'}
                >
                    Delete
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Delete sale {sale.title}</DrawerTitle>
                        <DrawerDescription>Are you sure you want to delete the sale {sale.title} ?</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">

                    </div>
                    <DrawerFooter>
                        <Button onClick={handleDelete} disabled={isLoading} variant={'destructive'}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Delete
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

export default DeleteSaleDialog;