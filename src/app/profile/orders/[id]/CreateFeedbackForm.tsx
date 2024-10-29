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


const CreateFeedbackForm = () => {
    const [feedback,setFeedback] = useState<string>("");
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const handleSendMessage = () => {
        if(!feedback){
            toast({description: 'Please enter feedback'})
            return
        }
        setIsLoading(true)
        axiosInstance.post('/feedbacks').then(res=>{
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
                <Button size={'sm'} className={'ml-2'}>Create feedback</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Send message</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                            <Textarea
                                onChange={(e)=>setFeedback(e.target.value)}
                                value={feedback}
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

export default CreateFeedbackForm;