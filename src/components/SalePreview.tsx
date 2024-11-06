'use client'
import React from 'react';
import {Sale} from "@/types/sale";
import {Card} from "@/components/ui/card";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import {Loader2, Star} from "lucide-react";
import {getNameByPath} from "@/services/navService";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import Tree from "@/components/my-ui/Tree";
import UserAvatar from "@/components/my-ui/UserAvatar";
import EditSaleDialog from "@/components/EditSaleDialog";

const SalePreview = ({sale, isProfile, forAdmin = false, avatar = true, edit = false, rate = false}:{sale: Sale, isProfile?: boolean, forAdmin?: boolean, avatar?: boolean, edit?: boolean, rate?: boolean}) => {
    return (
        <Card className={'flex flex-col w-full p-4 mb-2'}>
            <Link
                href={`/sale/${sale.id}${forAdmin ? '?forAdmin=true' : '?forAdmin=false'}`}
            >
                <div>
                    <div className={'flex items-center justify-between'}>
                        <div className={'w-full'}>
                            {avatar &&
                                <div className={'flex items-center justify-between w-full'}>
                                    <UserAvatar photoUrl={sale.user.photoUrl || ""} nickname={sale.user.nickname} id={sale.userId}/>
                                    {edit && !rate && <EditSaleDialog sale={sale}/>}
                                    {rate && sale.user.averageRating && <p className={'flex items-center'}><Star className={'w-4 h-4'}/> {sale.user.averageRating}</p>}
                                </div>
                            }
                            <p className={'mt-1 leading-7'}>{sale.title}</p>
                        </div>
                    </div>
                    <Separator className={'my-2'}/>
                    <p className={'text-muted-foreground text-sm whitespace-pre-line overflow-hidden text-ellipsis break-words max-h-16'}>
                        {sale.description.split('\n').filter(line => line.trim() !== '').join('\n')}
                    </p>
                    {sale.currency && !isProfile && <p>Count {sale.subScope.name.toLowerCase()}: <span className={'text-muted-foreground'}>{sale.currency}</span></p>}
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
            {isProfile && sale.isModerating &&
                <HoverCard openDelay={200}>
                    <HoverCardTrigger><Loader2 className="animate-spin mt-2"/></HoverCardTrigger>
                    <HoverCardContent>
                        This sale is under moderation
                    </HoverCardContent>
                </HoverCard>
            }
        </Card>
    );
};

export default SalePreview;