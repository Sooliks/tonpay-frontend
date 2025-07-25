'use client'
import React from 'react';
import {Feedback} from "@/types/feedback";
import UserAvatar from "@/components/my-ui/UserAvatar";
import {Star} from "lucide-react";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";

const FeedbackPreview = ({feedback}:{feedback: Feedback}) => {
    return (
        <div className={'mb-2'}>
            <div className={'p-4'}>
                <div className={'flex w-full justify-between'}>
                    <UserAvatar
                        photoUrl={feedback.user.photoUrl || ""}
                        nickname={feedback.user.nickname}
                        id={feedback.user.id}
                    />
                    <p className={'flex items-center'}><Star className={'w-4 h-4 ml-1'}/> {feedback.rate}</p>
                </div>
                {feedback.order.sale &&
                    <p className={'flex items-center'}>
                        Sale:
                        <Link className={'ml-1 text-blue-800 text-sm text-muted-foreground'} href={`/sale/${feedback.order.sale?.id}`}>
                            {feedback.order.sale?.title}
                        </Link>
                    </p>
                }
                <p className={'ml-2 whitespace-pre-line'}>{feedback.text}</p>
                <p className={'mt-2 text-muted-foreground text-sm'}>
                    Amount: <span className={'ml-auto text-sm tracking-widest text-muted-foreground'}>{feedback.order.amount.toFixed(2)} TON</span>
                </p>
            </div>
            <Separator orientation={'horizontal'}/>
        </div>
    );
};

export default FeedbackPreview;