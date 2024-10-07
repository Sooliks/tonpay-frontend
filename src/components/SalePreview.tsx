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
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {Loader2, Slash} from "lucide-react";
import {getNameByPath} from "@/services/navService";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const SalePreview = ({sale, isProfile}:{sale: Sale, isProfile?: boolean}) => {
    return (
        <Card className={'flex flex-col w-full p-4 mb-2'}>
            <Link href={`/sale/${sale.id}`}>
                <div>
                    <div className={'flex items-center justify-between'}>
                        <div>
                            <div className={'flex items-center'}>
                                <Avatar className={'h-6 w-6'}>
                                    <AvatarImage src={sale.user.photoUrl}/>
                                    <AvatarFallback>{sale.user.nickname}</AvatarFallback>
                                </Avatar>
                                <p className={'text-muted-foreground text-sm ml-2'}>@{sale.user.nickname}</p>
                            </div>
                            <p className={'mt-1 leading-7'}>{sale.title}</p>
                        </div>
                        {isProfile && sale.isModerating &&
                            <HoverCard openDelay={200}>
                                <HoverCardTrigger><Loader2 className="mr-2 animate-spin"/></HoverCardTrigger>
                                <HoverCardContent>
                                    This sale is under moderation
                                </HoverCardContent>
                            </HoverCard>
                        }
                    </div>
                    <Separator className={'my-2'}/>
                    <p className={'text-muted-foreground text-sm whitespace-pre-line overflow-hidden text-ellipsis break-words max-h-16'}>
                        {sale.description.split('\n').filter(line => line.trim() !== '').join('\n')}
                    </p>
                </div>
            </Link>
            {isProfile &&
                <Breadcrumb className={'mt-4'}>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className={'text-blue-800'} href={`/buy/${sale.subScope.scope.type}`}>{getNameByPath(sale.subScope.scope.type)}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink className={'text-blue-800'} href={`/buy/${sale.subScope.scope.type}?open=${sale.subScope.scope.name}`}>{sale.subScope.scope.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink className={'text-blue-800'} href={`/buy/${sale.subScope.scope.type}/${sale.subScope.id}`}>{sale.subScope.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            }
        </Card>
    );
};

export default SalePreview;