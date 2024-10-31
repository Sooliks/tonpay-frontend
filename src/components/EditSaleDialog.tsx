import React, {useState} from 'react';
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
import {Sale} from "@/types/sale";

const EditSaleDialog = ({sale}:{sale: Sale}) => {
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const handleSendMessage = () => {
        setIsLoading(true)
        axiosInstance.post('/chat/createmessage').then(res=>{
            if(res.status === 201) {

            }
        }).finally(() => setIsLoading(false)).catch((error: AxiosError)=>{
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: `Error: ${errorMessage}`})
        })
    }
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button
                    variant="outline" size="icon"
                >
                    <Pencil className="h-4 w-4"/>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Edit sale</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">

                        </div>
                    </div>
                    <DrawerFooter>
                        <Button onClick={handleSendMessage} disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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