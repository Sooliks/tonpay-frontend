'use client'
import React from 'react';
import {Sale} from "@/types/sale";
import useSWRInfinite from "swr/infinite";
import SpinLoading from "@/components/my-ui/SpinLoading";
import {Report} from "@/types/report";
import InfiniteScroll from "react-infinite-scroll-component";
import {Skeleton} from "@/components/ui/skeleton";
import ReportPreview from "@/app/admin/reports/ReportPreview";

const COUNT_ON_PAGE = 10;
const ReportsArchivePage = () => {
    const getKey = (pageIndex: number, previousPageData: Sale[] | null) => {
        if (previousPageData && !previousPageData.length) return null;
        return `/reports/completed?count=${COUNT_ON_PAGE}&skip=${pageIndex * COUNT_ON_PAGE}`;
    };
    const { data, error, isLoading, size, setSize } = useSWRInfinite<Report[]>(getKey)
    if(isLoading){
        return <SpinLoading/>
    }
    const items = data?.flat() || [];
    return (
        <div className={'p-4'}>
            <h4 className={'text-center scroll-m-20 text-xl font-semibold tracking-tight mb-2'}>
                Archive reports
            </h4>
            {data && items.length > 0 ?
                <InfiniteScroll
                    dataLength={items.length}
                    next={() => setSize(size + 1)}
                    hasMore={data[data.length - 1]?.length === COUNT_ON_PAGE}
                    loader={<Skeleton/>}
                    scrollableTarget="scrollableDiv"
                >
                    <div className={'flex flex-col'}>
                        {data.length > 0 ? data.map(sale => (sale.map(report => <ReportPreview isArchive key={report.id} report={report}/>)))
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

export default ReportsArchivePage;