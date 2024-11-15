'use client'
import React, {useState} from 'react';
import {Report} from "@/types/report";
import UserAvatar from "@/components/my-ui/UserAvatar";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import axiosInstance from "@/configs/axios";
import {toast} from "@/hooks/use-toast";
import {AxiosError} from "axios";
import {useRouter} from "next/navigation";

const ReportPreview = ({report, onConfirm, isArchive = false}: {report: Report, onConfirm?: () => void, isArchive?: boolean}) => {
    const [isLoadingChat,setIsLoadingChat] = useState<boolean>(false);
    const [isLoadingConfirm,setIsLoadingConfirm] = useState<boolean>(false);
    const {push} = useRouter();
    const handleClickChat = () => {
        setIsLoadingChat(true)
        axiosInstance.post('/reports/getchat', {reportId: report.id}).then(res=>{
            if(res.data){
                push(`/chat/${res.data}`);
            }else {
                toast({description: 'Data not found'});
            }
        }).finally(() => setIsLoadingChat(false)).catch((error: AxiosError)=>{
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: `Error: ${errorMessage}`})
        })
    }
    const handleClickConfirm = () => {
        setIsLoadingConfirm(true);
        axiosInstance.post('/reports/confirm', {reportId: report.id}).then(res=>{
            if(res.status === 201) {
                if(onConfirm) onConfirm()
            }
        }).finally(() => setIsLoadingConfirm(false)).catch((error: AxiosError)=>{
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: `Error: ${errorMessage}`})
        })
    }
    return (
        <div className={'mb-2'}>
            <div className={'w-full flex flex-col'}>
                <h6 className={'text-center'}>Report #{report.id}</h6>
                <div className={'flex items-center'}>
                    <UserAvatar photoUrl={report.user.photoUrl || ""} nickname={report.user.nickname} id={report.user.id}/>
                    <Separator orientation={'vertical'} className={'mx-2 h-6 ml-4'}/>
                    <Link href={`/profile/orders/${report.orderId}?forAdmin=true`} className={'text-blue-800 text-sm'}>
                        <Button variant={'ghost'} className={'text-blue-800 text-sm'}>Order</Button>
                    </Link>
                    <Separator orientation={'vertical'} className={'mx-2 h-6'}/>
                    <Button
                        variant={'ghost'}
                        className={'text-blue-800 text-sm'}
                        onClick={handleClickChat}
                        disabled={isLoadingChat}
                    >
                        {isLoadingChat && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                        Chat
                    </Button>
                </div>
                <p className={'ml-2 whitespace-pre-line'}>{report.text}</p>
                {!isArchive &&
                    <Button
                        size={'sm'}
                        className={'my-2'}
                        disabled={isLoadingConfirm}
                        onClick={handleClickConfirm}
                    >
                        {isLoadingConfirm && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Confirm report
                    </Button>
                }
                <div className={'flex justify-between'}>
                    <div className={'flex items-center'}>
                        {report.admin &&
                            <div className={'flex items-center'}>
                                <p className={'text-sm text-muted-foreground'}>Admin:</p>
                                <UserAvatar
                                    small
                                    className={'ml-2'}
                                    photoUrl={report.admin.photoUrl || ""}
                                    nickname={report.admin.nickname}
                                    id={report.admin.id}
                                />
                            </div>
                        }
                    </div>
                    <p className={'self-end'}>{new Date(report.createdAt).toLocaleDateString() + " " + new Date(report.createdAt).toLocaleTimeString()}</p>
                </div>
            </div>
            <Separator orientation={'horizontal'} className={'mt-2'}/>
        </div>
    );
};

export default ReportPreview;