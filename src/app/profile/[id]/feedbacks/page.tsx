'use client'
import React from 'react';
import useSWR from "swr";
import SpinLoading from "@/components/my-ui/SpinLoading";
import {Feedback} from "@/types/feedback";


type ProfilePageProps = {
    params: {
        id: string
    }
}
const FeedbacksPage = ({params}: ProfilePageProps) => {
    const { data, error, isLoading } = useSWR<Feedback[]>(`/feedbacks/byuserid/${params.id}`)
    if(isLoading){
        return <SpinLoading/>
    }
    return (
        <div className={'mt-2'}>
            {data && data.length > 0 ? data.map(feedback=>
                    <div key={feedback.id}>

                    </div>
                )
                :
                <p className={'text-center text-muted-foreground text-2xl mt-24'}>Nothing</p>
            }
        </div>
    );
};

export default FeedbacksPage;