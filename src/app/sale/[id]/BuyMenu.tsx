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
import {Sale} from "@/types/sale";
import axiosInstance from "@/configs/axios";
import {toast} from "@/hooks/use-toast";
import {AxiosError} from "axios";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";

const BuyMenu = ({sale}:{sale: Sale}) => {
    const [isLoading, setIsLoading] = useState(false);
    const {push} = useRouter();
    const handleSubmit = () => {
        setIsLoading(true)
        axiosInstance.post(`/orders`, {saleId: sale.id}).then(res=>{
            if(res.status === 201) {
                toast({description: 'Order created'})
                push(`/chat/${res.data.chatId}`)
            }
        }).catch((error: AxiosError)=>{
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: `Error: ${errorMessage}`})
        }).finally(()=>setIsLoading(false))
    }
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className={'w-36'}>Buy <span className={'text-muted-foreground text-sm ml-2'}>[{sale.price} TON]</span></Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Buy {sale.title}</DrawerTitle>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Buy <span className={'text-muted-foreground text-sm ml-2'}>[{sale.price} TON]</span>
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

export default BuyMenu;