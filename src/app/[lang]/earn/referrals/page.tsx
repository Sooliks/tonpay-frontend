'use client'
import React from 'react';
import CopyButton from "@/components/my-ui/CopyButton";
import {Card} from "@/components/ui/card";
import {useTranslation} from "@/hooks/useTranslation";
import {useAuth} from "@/hooks/useAuth";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import useSWR from "swr";
import SpinLoading from "@/components/my-ui/SpinLoading";
import NotFound from "@/app/[lang]/not-found";
import {UserType} from "@/types/user-type";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useUtils} from "@telegram-apps/sdk-react";

const ReferralsPage = () => {
    const {translations} = useTranslation()
    const auth = useAuth()
    const { data, error, isLoading } = useSWR<UserType[]>(`/referrals/my`)
    const utils = useUtils();
    if(isLoading){
        return <SpinLoading/>
    }
    if(!data){
        return <NotFound/>
    }
    const handleInviteFriend = () => {
        utils.shareURL(`https://t.me/PayOnTonBot/app?startapp=${auth.user?.id}`, 'Join our best trading platform right inside Telegram')
    }
    return (
        <div className={'flex flex-col p-4'}>
            <Card className={'flex flex-col items-center p-4 mt-4'}>
                <CopyButton refTelegram={false} copyText={`https://t.me/PayOnTonBot/app?startapp=${auth.user?.id}`} textButton={translations.profile.settings.refButton}/>
                <Button onClick={handleInviteFriend} className={'mt-2'} size={'sm'}>
                    Invite friend
                </Button>
            </Card>
            <Table className={'mt-4'}>
                <TableCaption>Your top 100 referrals</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nickname</TableHead>
                        <TableHead>TON</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map(referal=> (
                        <TableRow key={referal.id}>
                            <TableCell>
                                <Link href={`/profile/${referal.id}`} passHref>
                                    {referal.nickname}
                                </Link>
                            </TableCell>
                            <TableCell>{referal.money.toFixed(3)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">{data.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

export default ReferralsPage;