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
    return (
        <div className={'w-full flex flex-col p-4'}>
            <Button variant={'outline'} onClick={back} className={'w-24'}>Back</Button>
            {data ?
                <InfiniteScroll
                    dataLength={items.length}
                    next={()=>setSize(size+1)}
                    hasMore={data[data.length - 1]?.length === COUNT_ON_PAGE}
                    loader={<Skeleton/>}
                    scrollableTarget="scrollableDiv"
                >
                    <Table>
                        <TableCaption>Transactions</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Transaction</TableHead>
                                <TableHead>Confirmed</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead className="text-right">Type</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map(transactions=> (
                                transactions.map(tx=>
                                    <TableRow key={tx.id} className={'h-16'}>
                                        <TableCell className="font-medium"><Link className={'text-blue-800 flex items-center'} target={'_blank'} href={`https://tonviewer.com/transaction/${tx.transactionId}`}>Tonviewer <LinkIco className={'ml-1'} size={10}/></Link></TableCell>
                                        <TableCell>{tx.confirmed ? <Check color={'green'}/> : <Ban color={'red'}/>}</TableCell>
                                        <TableCell><span className={'ml-auto text-sm tracking-widest text-muted-foreground'}>{tx.countTon.toFixed(5)} TON</span></TableCell>
                                        <TableCell className="text-right">{tx.type}</TableCell>
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