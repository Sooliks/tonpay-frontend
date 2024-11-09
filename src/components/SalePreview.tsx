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
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import DeleteSaleDialog from "@/components/DeleteSaleDialog";

const SalePreview = ({sale, isProfile, forAdmin = false, avatar = true, edit = false, rate = false, onSave}:{sale: Sale, isProfile?: boolean, forAdmin?: boolean, avatar?: boolean, edit?: boolean, rate?: boolean, onSave?: () => void}) => {
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
                                    {rate && sale.user.averageRating &&
                                        <Tooltip delayDuration={200}>
                                            <TooltipTrigger>
                                                <p className={'flex items-center'}><Star className={'w-4 h-4'}/> {sale.user.averageRating}</p>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Seller rating</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    }
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
            {!sale.isPublished && isProfile && <p className={'text-sm text-muted-foreground mt-1'}>Not published</p>}
            <div className={'flex items-center justify-between'}>
                {isProfile && sale.isModerating &&
                    <HoverCard openDelay={200}>
                        <HoverCardTrigger><Loader2 className="animate-spin mt-2"/></HoverCardTrigger>
                        <HoverCardContent>
                            This sale is under moderation
                        </HoverCardContent>
                    </HoverCard>
                }
                {edit && !rate &&
                    <EditSaleDialog data={sale} onSave={()=>{if(onSave) onSave()}}/>
                }
            </div>
            {edit && <DeleteSaleDialog sale={sale} onDelete={()=>{if(onSave) onSave()}}/>}
            <p className={'ml-auto text-sm tracking-widest text-muted-foreground mt-1'}>{sale.price.toFixed(2)} TON</p>
        </Card>
    );
};

export default SalePreview;