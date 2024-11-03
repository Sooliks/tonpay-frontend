'use client'
import React from 'react';
import useSWR from "swr";
import ReportPreview from "@/app/admin/reports/ReportPreview";
import {Report} from "@/types/report";
import SpinLoading from "@/components/my-ui/SpinLoading";

const ReportsPage = () => {
    const { data, error, isLoading } = useSWR<Report[]>(`/reports/uncompleted`)

    if(isLoading){
        return <SpinLoading/>
    }
    return (
        <div className={'p-4'}>
            <h4 className={'text-center scroll-m-20 text-xl font-semibold tracking-tight mb-2'}>Active reports</h4>
            {data && data.length > 0 ? data.map(report=>
                    <ReportPreview report={report} key={report.id}/>
                )
                :
                <p className={'text-center text-muted-foreground text-2xl mt-24'}>Nothing</p>
            }
        </div>
    );
};

export default ReportsPage;