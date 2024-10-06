'use client'
import React from 'react';
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Transaction} from "@/types/transaction";
import useSWRInfinite from "swr/infinite";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import InfiniteScroll from "react-infinite-scroll-component";
import {Skeleton} from "@/components/ui/skeleton";
import Link from "next/link";
import {Ban, Check, Link as LinkIco} from 'lucide-react'
import SpinLoading from "@/components/my-ui/SpinLoading";

const COUNT_ON_PAGE = 10;
const getKey = (pageIndex: number, previousPageData: Transaction[] | null) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/ton/transactions/?count=${COUNT_ON_PAGE}&skip=${pageIndex * COUNT_ON_PAGE}`;
};
const HistoryPaymentPage = () => {
    const {back} = useRouter();
    const { data, error, isLoading, size, setSize } = useSWRInfinite<Transaction[]>(getKey)
    if(isLoading){
        return <SpinLoading/>
    }
    const items = data?.flat() || [];
    console.log(items)
    return (
        <div className={'w-full flex flex-col'}>
            <Button variant={'outline'} onClick={back} className={'w-24 m-4'}>Back</Button>
            {data ?
                <InfiniteScroll
                    dataLength={items.length}
                    next={()=>setSize(size+1)}
                    hasMore={data[data.length - 1]?.length === COUNT_ON_PAGE}
                    loader={<Skeleton/>}
                    scrollableTarget="scrollableDiv"
                >
                    <Table className={'p-4'}>
                        <TableCaption>Transactions</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tx</TableHead>
                                <TableHead>Success</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map(transactions=> (
                                transactions.map(tx=>
                                    <TableRow key={tx.id} className={'h-16'}>
                                        <TableCell className="font-medium"><Link className={'text-blue-800 flex items-center'} target={'_blank'} href={`https://tonviewer.com/transaction/${tx.transactionId}`}>View<LinkIco className={'ml-1'} size={10}/></Link></TableCell>
                                        <TableCell>{tx.confirmed ? <Check color={'green'}/> : <Ban color={'red'}/>}</TableCell>
                                        <TableCell><span className={'ml-auto text-sm tracking-widest text-muted-foreground'}>{tx.countTon.toFixed(2)} TON</span></TableCell>
                                        <TableCell><p className={'text-sm'}>{new Date(tx.createdAt).toLocaleDateString()}</p><p className={'text-sm'}>{new Date(tx.createdAt).toLocaleTimeString()}</p></TableCell>
                                        <TableCell>{tx.type === 'PAYMENT' ? 'PAY' : 'OUT'}</TableCell>
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

export default HistoryPaymentPage;