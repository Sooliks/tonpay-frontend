'use client'
import React from 'react';
import {TonConnectButton, useTonConnectUI} from "@tonconnect/ui-react";
import {beginCell, toNano} from "@ton/core";
import {useAuth} from "@/hooks/useAuth";
import Pay from "@/app/profile/wallet/Pay";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Car} from "lucide-react";
import {Card} from "@/components/ui/card";
import Link from "next/link";


const WalletPage = () => {
    const [tonConnectUi] = useTonConnectUI();
    const auth = useAuth()
    const handlePay = async (amount: number) => {
        if(!tonConnectUi.wallet){
            tonConnectUi.openModal()
            return
        }
        const body = beginCell()
            .storeUint(0, 32) // write 32 zero bits to indicate that a text comment will follow
            .storeStringTail(auth.user!.id) // write our text comment
            .endCell();
        const response = await tonConnectUi.sendTransaction({
            messages: [
                {
                    address: 'UQDFD5TTfKEKnFgJkeKiCCzrDpX_iM85JRdig3RnmPrnjjMA',
                    amount: toNano(amount.toString()).toString(),
                    payload: body.toBoc().toString("base64")
                }
            ],
            validUntil: Math.floor(Date.now() / 1000) + 360
        }, {returnStrategy: 'none'});
        alert(response.boc)
    }
    return (
        <div className={'w-full flex flex-col items-center'}>
            <Card className={'p-4 mx-4 mt-2'}>
                <p className={'text-xs'}>Balance: <span className={'ml-auto text-sm tracking-widest text-muted-foreground'}>{auth.user?.money} TON</span></p>
            </Card>
            <div className={'w-full flex items-center flex-col mt-2'}>
                <div className={'flex justify-between w-full'}>
                    <Link href={'/profile/wallet/history'} className={'ml-4'}>
                        <Button variant={'outline'} className={'h-10'}>History payment</Button>
                    </Link>
                    <TonConnectButton className={'mr-4'}/>
                </div>
                <Separator className={'mt-2'}/>
                <Pay onPay={handlePay}/>
            </div>
        </div>
    );
};

export default WalletPage;