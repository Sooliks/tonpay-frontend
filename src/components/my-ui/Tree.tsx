'use client'
import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {Card} from "@/components/ui/card";
import {Slash} from "lucide-react";
export type TreeItem = {
    href: string
    name: string
}
const Tree = ({type, scope, subScope, sticky = true, forPreview}: {type: TreeItem, scope: TreeItem, subScope: TreeItem, sticky?: boolean, forPreview?: boolean}) => {
    return (
        forPreview ?
            <Breadcrumb className={'mt-4'}>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className={'text-blue-800'} href={type.href}>{type.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink className={'text-blue-800'} href={scope.href}>{scope.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink className={'text-blue-800'} href={subScope.href}>{subScope.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            :
            <Card className={`p-4 mb-4 ${sticky && 'top-0 sticky'}`}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className={'text-blue-800'} href={type.href}>{type.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink className={'text-blue-800'} href={scope.href}>{scope.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink className={'text-blue-800'} href={subScope.href}>{subScope.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Card>

    );
};

export default Tree;