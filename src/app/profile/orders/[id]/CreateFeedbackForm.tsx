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
import {Loader2, Star} from "lucide-react";
import {Slider} from "@/components/ui/slider";


const CreateFeedbackForm = ({saleId}:{saleId: string}) => {
    const [feedback,setFeedback] = useState<string>("");
    const [stars,setStars] = useState<number>(5);
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const handleSendFeedback = () => {
        setIsLoading(true)
        axiosInstance.post('/feedbacks', {saleId: saleId, rate: stars, feedback: feedback || undefined}).then(res=>{
            if(res.status === 201) {
                toast({description: `Feedback created`})

            }
        }).finally(() => setIsLoading(false)).catch((error: AxiosError)=>{
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: `Error: ${errorMessage}`})
        })
    }
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button size={'sm'} className={'ml-2'} variant={'secondary'}>Create feedback</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Create feedback</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                            <Textarea
                                onChange={(e)=>setFeedback(e.target.value)}
                                value={feedback}
                                placeholder="Enter text"
                            />
                        </div>
                        <div className={'mt-2 flex items-center'}>
                            <Slider
                                defaultValue={[5]}
                                max={5}
                                step={1}
                                min={1}
                                value={[stars]}
                                onValueChange={(e) => setStars(e[0])}
                            />
                            <p className={'flex items-center'}><Star className={'w-4 h-4 ml-1'}/> {stars}</p>
                        </div>
                    </div>
                    <DrawerFooter>
                        <Button onClick={handleSendFeedback} disabled={isLoading}>
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