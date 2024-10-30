'use client'
import React from 'react';
import useSWR from "swr";
import {Feedback} from "@/types/feedback";
import {Skeleton} from "@/components/ui/skeleton";
import {Separator} from "@/components/ui/separator";
import UserAvatar from "@/components/my-ui/UserAvatar";
import {Star} from "lucide-react";
import Link from "next/link";
import FeedbackPreview from "@/app/profile/[id]/feedbacks/FeedbackPreview";


type ProfilePageProps = {
    params: {
        id: string
    }
}
const FeedbacksPage = ({params}: ProfilePageProps) => {
    const { data, error, isLoading } = useSWR<Feedback[]>(`/feedbacks/byuserid/${params.id}`)
    if(isLoading){
        return(
            <div className="flex flex-col space-y-3 mt-2">
                <Skeleton className="h-[125px] w-full rounded-xl"/>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-96"/>
                    <Skeleton className="h-4 w-80"/>
                </div>
            </div>
        )
    }
    return (
        <div className={'mt-2'}>
            {data && data.length > 0 ? data.map(feedback=><FeedbackPreview key={feedback.id} feedback={feedback}/>)
                :
                <p className={'text-center text-muted-foreground text-2xl mt-24'}>Nothing</p>
            }
        </div>
    );
};

export default FeedbacksPage;