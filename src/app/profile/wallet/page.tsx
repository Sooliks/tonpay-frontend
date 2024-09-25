'use client'
import React from 'react';
import {TonConnectButton, useTonConnectUI} from "@tonconnect/ui-react";
import {beginCell, toNano} from "@ton/core";
import {useAuth} from "@/hooks/useAuth";
import Pay from "@/app/profile/wallet/Pay";

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
        <div className={'w-full flex items-center flex-col'}>
            <div className={'flex justify-end w-full'}>
                <TonConnectButton/>
            </div>
            <Pay onPay={handlePay}/>
        </div>
    );
};

export default WalletPage;