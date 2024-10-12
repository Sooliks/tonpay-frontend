'use client'
import React from 'react';
import {Sale} from "@/types/sale";
import {Card} from "@/components/ui/card";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import {Loader2} from "lucide-react";
import {getNameByPath} from "@/services/navService";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Tree from "@/components/my-ui/Tree";
import UserAvatar from "@/components/my-ui/UserAvatar";

const SalePreview = ({sale, isProfile, forAdmin = false}:{sale: Sale, isProfile?: boolean, forAdmin?: boolean}) => {
    return (
        <Card className={'flex flex-col w-full p-4 mb-2'}>
            <Link href={`/sale/${sale.id}${forAdmin && '?forAdmin=true'}`}>
                <div>
                    <div className={'flex items-center justify-between'}>
                        <div>
                            <UserAvatar photoUrl={sale.user.photoUrl || ""} nickname={sale.user.nickname} id={sale.userId}/>
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
                <Tree
                    forPreview
                    type={{href: `/buy/${sale.subScope.scope.type}`, name: getNameByPath(sale.subScope.scope.type) || ''}}
                    scope={{href: `/buy/${sale.subScope.scope.type}?open=${sale.subScope.scope.name}`, name: sale.subScope.scope.name}}
                    subScope={{href: `/buy/${sale.subScope.scope.type}/${sale.subScope.id}`, name: sale.subScope.name}}
                />
            }
        </Card>
    );
};

export default SalePreview;