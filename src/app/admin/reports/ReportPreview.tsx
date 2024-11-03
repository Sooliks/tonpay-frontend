'use client'
import React from 'react';
import {Report} from "@/types/report";
import UserAvatar from "@/components/my-ui/UserAvatar";
import {Separator} from "@/components/ui/separator";

const ReportPreview = ({report}: {report: Report}) => {
    return (
        <div className={'mb-2'}>
            <div className={'w-full flex flex-col'}>
                <h6 className={'text-center text-2xl mb-2'}>Report #{report.id}</h6>
                <UserAvatar photoUrl={report.user.photoUrl || ""} nickname={report.user.nickname} id={report.user.id}/>
                <p className={'text-ellipsis max-w-56 truncate whitespace-nowrap ml-2'}>{report.text}</p>
                <p className={'self-end'}>{new Date(report.createdAt).toLocaleDateString() + " " + new Date(report.createdAt).toLocaleTimeString()}</p>
            </div>
            <Separator orientation={'horizontal'} className={'mt-2'}/>
        </div>
    );
};

export default ReportPreview;