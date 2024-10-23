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
import {Textarea} from "@/components/ui/textarea";
import {toast} from "@/hooks/use-toast";
import axiosInstance from "@/configs/axios";
import {AxiosError} from "axios";
import {useAuth} from "@/hooks/useAuth";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";

const FirstSendMessageDialog = ({recipientId}:{recipientId: string}) => {
    const [message,setMessage] = useState<string>("");
    const {push} = useRouter()
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const auth = useAuth();
    const handleSendMessage = () => {
        if(!message){
            toast({description: 'Please enter message'})
            return
        }
        setIsLoading(true)
        axiosInstance.post('/chat/createmessage', {recipientId: recipientId, senderId: auth.user?.id, message: message}).then(res=>{
            if(res.status === 201) {
                if(res.data.chatId){
                    push(`/chat/${res.data.chatId}`)
                }
            }
        }).finally(() => setIsLoading(false)).catch((error: AxiosError)=>{
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: `Error: ${errorMessage}`})
        })
    }
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button size={'sm'}>Send message</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Send message</DrawerTitle>
                        {/*<DrawerDescription>Send first message</DrawerDescription>*/}
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
                        <Button onClick={handleSendMessage} disabled={isLoading}>
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

export default FirstSendMessageDialog;