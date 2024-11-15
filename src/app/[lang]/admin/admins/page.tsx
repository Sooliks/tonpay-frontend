'use client'
import React from 'react';
import useSWR from "swr";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {UserType} from "@/types/user-type";
import SpinLoading from "@/components/my-ui/SpinLoading";
import Link from "next/link";

const AdminsPage = () => {
    const { data, error, isLoading } = useSWR<UserType[]>(`/stats/admins`)
    if(isLoading){
        return <SpinLoading/>
    }
    return (
        <Table className={'p-4'}>
            <TableCaption>Admins</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Nickname</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Online</TableHead>
                    <TableHead>TON</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data && data.length > 0 ? data.map(user=> (
                    <TableRow key={user.id} className={'h-16'}>
                        <TableCell><Link className={'text-blue-800'} href={`/profile/${user.id}`}>{user.nickname}</Link></TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell><p>{new Date(user.lastOnline).toLocaleDateString()}</p><p>{new Date(user.lastOnline).toLocaleTimeString()}</p></TableCell>
                        <TableCell>{user.money.toFixed(3)}</TableCell>
                    </TableRow>
                    ))
                    :
                    <p>Nothing</p>
                }
            </TableBody>
        </Table>
    );
};

export default AdminsPage;