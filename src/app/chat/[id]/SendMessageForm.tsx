'use client'
import React, {useCallback, useState} from 'react';
import {Textarea} from "@/components/ui/textarea";
import {SubmitHandler, useForm} from "react-hook-form";
import ImagePreview, {PreviewFile} from "@/app/profile/sales/add/ImagePreview";
import {toast} from "@/hooks/use-toast";
import {Loader2, Paperclip, SendHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import update from "immutability-helper";
import axiosInstance from "@/configs/axios";
import {CreateMessage} from "@/types/chat/create-message";
import {useAuth} from "@/hooks/useAuth";
import {AxiosError} from "axios";
import {Message} from "@/types/chat/message";

const SendMessageForm = ({recipientId, onMessage}:{recipientId: string, onMessage: (message: Message) => void}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<CreateMessage>({mode: 'onChange'});
    const [isLoadingSubmit,setIsLoadingSubmit] = useState<boolean>(false)
    const [files, setFiles] = useState<PreviewFile[]>([]);
    const auth = useAuth()

    const onFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(files.length >= 2 || e.target!.files!.length > 2){
            toast({description: 'Maximum 2 images.'})
            return
        }
        const selectedFiles = Array.from(e.target.files || []);
        const previewFiles = selectedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setFiles((prevFiles) => [...prevFiles, ...previewFiles]);
    };
    const removeImage = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };
    const moveImage = useCallback((dragIndex: number, hoverIndex: number) => {
        setFiles((prevFiles) =>
            update(prevFiles, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevFiles[dragIndex]],
                ],
            })
        );
    }, []);
    const onSubmit: SubmitHandler<CreateMessage> = async (data) => {
        if(!data.content && files.length === 0){
            toast({description: 'The message must contain text or files'})
            return
        }
        setIsLoadingSubmit(true)
        const formData = new FormData();
        formData.append("recipientId", recipientId);
        formData.append("senderId", auth.user!.id);
        formData.append("message", data.content);
        files.forEach((fileObj, index) => {
            formData.append("files", fileObj.file);
        });
        axiosInstance.post('/chat/createmessage', formData).then(res=> {
            if(res.status === 201) {
                reset()
                onMessage(res.data)
            }
        }).finally(() =>{setIsLoadingSubmit(false); reset(); setFiles([])}).catch((error: AxiosError)=>{
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: `Error: ${errorMessage}`})
        })
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && event.shiftKey) {
            event.preventDefault();
            handleSubmit(onSubmit)();
        }
    };
    return (
        <>
            <form
                className={'flex justify-between items-center'}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Textarea
                    placeholder="Enter message"
                    id="description"
                    {...register('content')}
                    maxLength={500}
                    className="resize-none"
                    onKeyDown={handleKeyDown}
                />
                <div className={'flex items-center'}>
                    <Input
                        type="file"
                        id="images"
                        onChange={onFilesChange}
                        multiple
                        accept="image/*"
                        className="hidden"
                        max={2}
                    />
                    <Button
                        type={'button'}
                        onClick={()=>{
                            const fileInput = document.getElementById("images") as HTMLInputElement;
                            if (fileInput) {
                                fileInput.click();
                            }
                        }}
                        className={'ml-1'}
                        size="icon"
                        variant={'outline'}
                    >
                        <Paperclip />
                    </Button>
                    <Button
                        type={'submit'}
                        disabled={isLoadingSubmit}
                        className={'ml-1'}
                        size="icon"
                    >
                        {isLoadingSubmit ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizontal />}
                    </Button>
                </div>
            </form>
            <DndProvider backend={HTML5Backend}>
                <div className="flex flex-wrap">
                    {files.map((file, index) => (
                        <ImagePreview
                            key={index}
                            file={file}
                            index={index}
                            moveImage={moveImage}
                            removeImage={removeImage}
                            small
                        />
                    ))}
                </div>
            </DndProvider>
        </>
    );
};

export default SendMessageForm;