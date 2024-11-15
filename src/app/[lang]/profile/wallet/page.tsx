'use client'
import React from 'react';
import {TonConnectButton} from "@tonconnect/ui-react";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useAuth} from "@/hooks/useAuth";
import {Card} from "@/components/ui/card";
import Withdrawal from "@/app/[lang]/profile/wallet/Withdrawal";
import Pay from "@/app/[lang]/profile/wallet/Pay";

const WalletPage = () => {
    const auth = useAuth()
    return (
        <div className={'w-full flex flex-col items-center'}>
            <Card className={'p-4 mx-4 mt-2 w-80'}>
                <p className={'text-xs'}>Balance: <span className={'ml-auto text-sm tracking-widest text-muted-foreground'}>{auth.user?.money} TON</span></p>
            </Card>
            <div className={'flex items-center flex-col mt-2 w-full'}>
                <div className={'flex justify-between w-full'}>
                    <Link href={'/profile/wallet/history'} className={'ml-4'}>
                        <Button variant={'outline'} className={'h-10'}>History transactions</Button>
                    </Link>
                    <TonConnectButton className={'mr-4'}/>
                </div>
                <Separator className={'mt-2'}/>
                <Tabs defaultValue="payment" className={'flex flex-col items-center mt-2 w-full'}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="payment">Payment</TabsTrigger>
                        <TabsTrigger value="withdrawal">Withdrawal</TabsTrigger>
                    </TabsList>
                    <TabsContent value="payment">
                        <Pay/>
                    </TabsContent>
                    <TabsContent value="withdrawal">
                        <Withdrawal/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default WalletPage;