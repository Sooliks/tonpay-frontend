import React, {useState} from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent, DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Loader2, MessageSquareWarning} from "lucide-react";
import {Order} from "@/types/order";

const ReportDialog = ({order}:{order: Order}) => {
    const [message,setMessage] = useState<string>("");
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const handleSendReport = () => {

    }
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button
                    className={'mt-2'}
                    variant={'outline'}
                >
                    Report <MessageSquareWarning className={'ml-2'}/>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Create report</DrawerTitle>
                        <DrawerDescription>Create report for order #{order.id}. After a while, we will help you solve your problem.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                            <Textarea
                                onChange={(e)=>setMessage(e.target.value)}
                                value={message}
                                placeholder="Enter message"
                            />
                        </div>
                    </div>
                    <DrawerFooter>
                        <Button onClick={handleSendReport} disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Send
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

export default ReportDialog;