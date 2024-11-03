'use client'
import React from 'react';
import useSWR from "swr";
import ReportPreview from "@/app/admin/reports/ReportPreview";
import {Report} from "@/types/report";
import SpinLoading from "@/components/my-ui/SpinLoading";
import Link from "next/link";

const ReportsPage = () => {
    const { data, error, isLoading, mutate } = useSWR<Report[]>(`/reports/uncompleted`)

    if(isLoading){
        return <SpinLoading/>
    }
    return (
        <div className={'p-4'}>
            <h4 className={'text-center scroll-m-20 text-xl font-semibold tracking-tight mb-2'}>
                Active reports
                <Link href={'/admin/reports/archive'} className={'ml-4 text-blue-800'}>Archive reports</Link>
            </h4>
            {data && data.length > 0 ? data.map(report=>
                    <ReportPreview report={report} key={report.id} onConfirm={mutate}/>
                )
                :
                <p className={'text-center text-muted-foreground text-2xl mt-24'}>Nothing</p>
            }
        </div>
    );
};

export default ReportsPage;