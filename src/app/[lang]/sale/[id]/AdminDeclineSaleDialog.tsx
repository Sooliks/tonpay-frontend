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
import {Textarea} from "@/components/ui/textarea";
import {toast} from "@/hooks/use-toast";
import axiosInstance from "@/configs/axios";
import {AxiosError} from "axios";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";

const AdminDeclineSaleDialog = ({saleId}:{saleId: string}) => {
    const [reason,setReason] = useState<string>("");
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const {back} = useRouter();
    const handleDecline = (isDecline: boolean) => {
        setIsLoading(true)
        axiosInstance.delete('sales', {data: {id: saleId, reason: reason || undefined, isDecline: isDecline}}).then(res=>{
            if(res.status === 200) {
                toast({description: 'Success'})
                back()
            }
        }).catch((error: AxiosError)=>{
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: `Error: ${errorMessage}`})
        }).finally(()=>setIsLoading(false))
    }
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant={'destructive'}>
                    Delete
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Action</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                            <Textarea
                                onChange={(e)=>setReason(e.target.value)}
                                value={reason}
                                placeholder="Enter reason (no requirement)"
                            />
                        </div>
                    </div>
                    <DrawerFooter>
                        <Button onClick={()=>handleDecline(true)} disabled={isLoading} variant={'default'}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Decline
                        </Button>
                        <p className={'text-center text-sm'}>OR</p>
                        <Button onClick={()=>handleDecline(false)} disabled={isLoading} variant={'destructive'}>
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

export default AdminDeclineSaleDialog;