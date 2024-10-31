'use client'
import React from 'react';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {UserType} from "@/types/user-type";
import SpinLoading from "@/components/my-ui/SpinLoading";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import {Skeleton} from "@/components/ui/skeleton";
import useSWRInfinite from "swr/infinite";

const COUNT_ON_PAGE = 10;
const getKey = (pageIndex: number, previousPageData: UserType[] | null) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/stats/users/?count=${COUNT_ON_PAGE}&skip=${pageIndex * COUNT_ON_PAGE}`;
};

const UsersPage = () => {
    const { data, error, isLoading, size, setSize } = useSWRInfinite<UserType[]>(getKey)
    if(isLoading){
        return <SpinLoading/>
    }
    const items = data?.flat() || [];
    return (
        data ?
            <InfiniteScroll
                dataLength={items.length}
                next={() => setSize(size + 1)}
                hasMore={data[data.length - 1]?.length === COUNT_ON_PAGE}
                loader={<Skeleton/>}
                scrollableTarget="scrollableDiv"
            >
                <Table className={'p-4'}>
                    <TableCaption>Users</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nickname</TableHead>
                            <TableHead>Last Online</TableHead>
                            <TableHead>TON</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map(users => (
                            users.map(user =>
                                <TableRow key={user.id} className={'h-16'}>
                                    <TableCell><Link className={'text-blue-800'} href={`/profile/${user.id}`}>{user.nickname}</Link></TableCell>
                                    <TableCell><p>{new Date(user.lastOnline).toLocaleDateString()}</p><p>{new Date(user.lastOnline).toLocaleTimeString()}</p></TableCell>
                                    <TableCell>{user.money.toFixed(3)}</TableCell>
                                </TableRow>
                            )
                        ))}
                    </TableBody>
                </Table>
            </InfiniteScroll>
            :
            <p>Nothing</p>
    );
};

export default UsersPage;