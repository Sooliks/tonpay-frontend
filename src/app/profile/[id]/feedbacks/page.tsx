'use client'
import React from 'react';
import {Feedback} from "@/types/feedback";
import {Skeleton} from "@/components/ui/skeleton";
import FeedbackPreview from "@/app/profile/[id]/feedbacks/FeedbackPreview";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWRInfinite from "swr/infinite";


type ProfilePageProps = {
    params: {
        id: string
    }
}
const COUNT_ON_PAGE = 10;
const FeedbacksPage = ({params}: ProfilePageProps) => {
    const getKey = (pageIndex: number, previousPageData: Feedback[] | null) => {
        if (previousPageData && !previousPageData.length) return null;
        return `/feedbacks/byuserid/${params.id}?count=${COUNT_ON_PAGE}&skip=${pageIndex * COUNT_ON_PAGE}`;
    };
    const { data, error, isLoading, size, setSize } = useSWRInfinite<Feedback[]>(getKey)
    const items = data?.flat() || [];
    if (isLoading) {
        return (
            <div className="flex flex-col space-y-3 mt-2">
                <Skeleton className="h-[125px] w-full rounded-xl"/>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-80"/>
                    <Skeleton className="h-4 w-56"/>
                </div>
            </div>
        )
    }
    return (
        <div className={'mt-2'}>
            {data && items.length > 0 ?
                <InfiniteScroll
                    dataLength={items.length}
                    next={()=>setSize(size+1)}
                    hasMore={data[data.length - 1]?.length === COUNT_ON_PAGE}
                    loader={<Skeleton/>}
                    scrollableTarget="scrollableDiv"
                >
                    <div className={'flex flex-col'}>
                        {data.length > 0 ? data.map(feedbacks=> (feedbacks.map(feedback=> <FeedbackPreview key={feedback.id} feedback={feedback}/>)))
                            :
                            <p className={'text-center text-muted-foreground text-2xl mt-24'}>Nothing</p>
                        }
                    </div>
                </InfiniteScroll>
                :
                <p className={'text-center text-muted-foreground text-2xl mt-24'}>Nothing</p>
            }
        </div>
    );
};

export default FeedbacksPage;