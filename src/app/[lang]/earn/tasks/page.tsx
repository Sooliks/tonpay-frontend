'use client'
import React from 'react';
import useSWR from "swr";
import {useTranslation} from "@/hooks/useTranslation";
import SpinLoading from "@/components/my-ui/SpinLoading";
import {TaskType} from "@/types/task";
import Task from "@/app/[lang]/earn/tasks/Task";
import NotFound from "@/app/[lang]/not-found";

const TasksPage = async () => {
    const { data, error, isLoading } = useSWR<TaskType[]>(`/tasks/get`)
    const {translations} = useTranslation();
    if(isLoading){
        return <SpinLoading/>
    }
    if(!data){
        return <NotFound/>
    }
    return (
        <div className={'flex flex-col items-center overflow-x-hidden p-4'}>
            {data.map(task=>
                <Task key={task.id} task={task}/>
            )}
        </div>
    );
};

export default TasksPage;