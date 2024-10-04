'use client'
import React from 'react';
import {Sale} from "@/types/sale";
import {Card} from "@/components/ui/card";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {Slash} from "lucide-react";
import {getNameByPath} from "@/services/navService";

const SalePreview = ({sale}:{sale: Sale}) => {
    return (
        <Card className={'flex flex-col w-full p-4'}>
            <Link href={`/sale/${sale.id}`}>
                <div>
                    <p>{sale.title}</p>
                    <Separator className={'my-2'}/>
                    <p className={'text-muted-foreground text-sm'}>{sale.description}</p>
                </div>
            </Link>
            <Breadcrumb className={'mt-4'}>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/buy/${sale.subScope.scope.type}`}>{getNameByPath(sale.subScope.scope.type)}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/buy/${sale.subScope.scope.type}?open=${sale.subScope.scope.name}`}>{sale.subScope.scope.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/buy/${sale.subScope.scope.type}/${sale.subScope.id}`}>{sale.subScope.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </Card>
    );
};

export default SalePreview;