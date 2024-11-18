'use client'
import React from 'react';
import {Transaction} from "@/types/transaction";
import useSWRInfinite from "swr/infinite";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import InfiniteScroll from "react-infinite-scroll-component";
import {Skeleton} from "@/components/ui/skeleton";
import SpinLoading from "@/components/my-ui/SpinLoading";
import {Order} from "@/types/order";
import Link from "next/link";
import NotFound from "@/app/[lang]/not-found";
import {Ban, Check} from "lucide-react";
import {useTranslation} from "@/hooks/useTranslation";

const COUNT_ON_PAGE = 10;
const getKey = (pageIndex: number, previousPageData: Transaction[] | null) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/orders/mysales/?count=${COUNT_ON_PAGE}&skip=${pageIndex * COUNT_ON_PAGE}`;
};
const MySales = () => {
    const { data, error, isLoading, size, setSize } = useSWRInfinite<Order[]>(getKey)
    const {translations} = useTranslation()
    if(isLoading){
        return <SpinLoading/>
    }
    if(!data){
        return <NotFound/>
    }
    const items = data?.flat() || [];
    return (
        <div className={'w-full flex flex-col'}>
            {data ?
                <InfiniteScroll
                    dataLength={items.length}
                    next={()=>setSize(size+1)}
                    hasMore={data[data.length - 1]?.length === COUNT_ON_PAGE}
                    loader={<Skeleton/>}
                    scrollableTarget="scrollableDiv"
                >
                    <Table>
                        <TableCaption>{translations.profile.orders.mySales}</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead>{translations.frequent.createdAt}</TableHead>
                                <TableHead>{translations.frequent.sale}</TableHead>
                                <TableHead>{translations.profile.orders.isCompleted}</TableHead>
                                <TableHead>{translations.frequent.amount}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map(orders=> (
                                orders.map(order=>
                                    <TableRow key={order.id} className={'h-16'}>
                                        <TableCell className={'text-sm'}><Link href={`/profile/orders/${order.id}`} className={'text-blue-800'}>{translations.frequent.details}</Link></TableCell>
                                        <TableCell className={'text-sm'}><p>{new Date(order.createdAt).toLocaleDateString()}</p><p>{new Date(order.createdAt).toLocaleTimeString()}</p></TableCell>
                                        <TableCell className={'text-sm'}><Link href={`/sale/${order.sale?.id}`} className={'text-blue-800'}>{translations.frequent.sale}</Link> {!order.sale?.id && ' (was deleted)'}</TableCell>
                                        <TableCell className={'text-sm'}>{order.isCompleted ? <Check color={'green'}/> : order.isCancelled ? 'Cancelled' : <Ban color={'red'}/>}</TableCell>
                                        <TableCell className={'text-sm'}><span className={'ml-auto text-sm tracking-widest text-muted-foreground'}>{order.amount.toFixed(2)} TON</span></TableCell>
                                    </TableRow>
                                )
                            ))}
                        </TableBody>
                    </Table>
                </InfiniteScroll>
                :
                <p>Nothing</p>
            }
        </div>
    );
};

export default MySales;