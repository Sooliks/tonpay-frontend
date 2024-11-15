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

const COUNT_ON_PAGE = 10;
const getKey = (pageIndex: number, previousPageData: Transaction[] | null) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/orders/mysales/?count=${COUNT_ON_PAGE}&skip=${pageIndex * COUNT_ON_PAGE}`;
};
const MySales = () => {
    const { data, error, isLoading, size, setSize } = useSWRInfinite<Order[]>(getKey)
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
                        <TableCaption>My sales</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead>Created at</TableHead>
                                <TableHead>Sale</TableHead>
                                <TableHead>Is completed</TableHead>
                                <TableHead>Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map(orders=> (
                                orders.map(order=>
                                    <TableRow key={order.id} className={'h-16'}>
                                        <TableCell><Link href={`/profile/orders/${order.id}`} className={'text-blue-800'}>Details</Link></TableCell>
                                        <TableCell><p>{new Date(order.createdAt).toLocaleDateString()}</p><p>{new Date(order.createdAt).toLocaleTimeString()}</p></TableCell>
                                        <TableCell><Link href={`/sale/${order.sale?.id}`} className={'text-blue-800'}>Sale</Link> {!order.sale?.id && ' (was deleted)'}</TableCell>
                                        <TableCell>{order.isCompleted ? <Check color={'green'}/> : order.isCancelled ? 'Cancelled' : <Ban color={'red'}/>}</TableCell>
                                        <TableCell><span className={'ml-auto text-sm tracking-widest text-muted-foreground'}>{order.amount.toFixed(2)} TON</span></TableCell>
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