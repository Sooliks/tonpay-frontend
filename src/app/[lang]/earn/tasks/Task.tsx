'use client'
import React, {useState} from 'react';
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Check, Loader2} from "lucide-react";
import {initUtils} from "@telegram-apps/sdk";
import {TaskType} from "@/types/task";
import {toast} from "@/hooks/use-toast";
import axiosInstance from "@/configs/axios";
import {AxiosError} from "axios";

type TaskTypeWithoutCheck = Omit<TaskType, 'check'>;
const Task = ({task}:{task: TaskTypeWithoutCheck}) => {
    const utils = initUtils();
    const [taskState,setTaskState] = useState<TaskTypeWithoutCheck>(task);
    const [hasUserFollowedLink,setHasUserFollowedLink] = useState<boolean>(false)
    const [isLoadingCheck,setIsLoadingCheck] = useState<boolean>(false)
    const [isLoadingLink,setIsLoadingLink] = useState<boolean>(false)
    const handleCheck = () => {
        if(isLoadingCheck)return
        setIsLoadingCheck(true)
        axiosInstance.post('/tasks/check', {idTask: task.id}).then(res=>{
            if(res.status === 201) setTaskState({...taskState, isComplete: true})
        }).catch((error: AxiosError)=>{
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: `${errorMessage}`})
        }).finally(()=>setIsLoadingCheck(false))
    }
    const handleClickRef = () => {
        if(isLoadingLink)return
        utils.openTelegramLink(taskState.link || "")
        setIsLoadingLink(true)
        setTimeout(()=>{
            setIsLoadingLink(false)
            setHasUserFollowedLink(true)
        },7000)
    }
    return (
        <Card className={'w-full p-4 flex justify-between items-center mb-2'}>
            <div>
                <p className={'text-muted-foreground text-sm'}>{taskState.name}</p>
                <p className={'text-sm'}>+{taskState.reward} <span style={{color: '#757575'}}>TON</span></p>
            </div>
            {taskState.isComplete ?
                <Check color={'green'}/>
                :
                taskState.link && !hasUserFollowedLink ?
                    <Button
                        onClick={handleClickRef}
                        variant={'outline'}
                        disabled={isLoadingLink}
                        className={'w-16'}
                    >
                        {isLoadingLink && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        Start
                    </Button>
                    :
                    <Button
                        onClick={handleCheck}
                        variant={'outline'}
                        disabled={isLoadingCheck}
                        className={'w-16'}
                    >
                        {isLoadingCheck && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        Check
                    </Button>
            }
        </Card>
    );
};

export default Task;