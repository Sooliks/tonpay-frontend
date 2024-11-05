'use client'
import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {beginCell, toNano} from "@ton/core";
import {useTonConnectUI} from "@tonconnect/ui-react";
import {useAuth} from "@/hooks/useAuth";
import {Loader2} from "lucide-react";

const buttons: number[] = [0.5, 1, 5, 10, 20, 100]

const Pay = () => {
    const [value,setValue] = useState<number>(0.5);
    const [tonConnectUi] = useTonConnectUI()
    const auth = useAuth();
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const handlePay = () => {
        if(!tonConnectUi.wallet){
            tonConnectUi.openModal()
            return
        }
        if(!auth.user?.id){
            alert('Error: Please reload app')
            return
        }
        setIsLoading(true)
        const body = beginCell()
            .storeUint(0, 32) // write 32 zero bits to indicate that a text comment will follow
            .storeStringTail(auth.user!.id) // write our text comment
            .endCell();
        tonConnectUi.sendTransaction({
            messages: [
                {
                    address: 'UQDFD5TTfKEKnFgJkeKiCCzrDpX_iM85JRdig3RnmPrnjjMA',
                    amount: toNano(value.toString()).toString(),
                    payload: body.toBoc().toString("base64")
                }
            ],
            validUntil: Math.floor(Date.now() / 1000) + 360
        }, {returnStrategy: 'none'}).finally(()=>setIsLoading(false));
    }
    return (
        <div className={'flex flex-col items-center w-full'}>
            <div>
                {buttons.map(button=>
                    <Button
                        key={button}
                        className={'w-24 h-24 m-4'}
                        variant={'outline'}
                        onClick={()=>setValue(button)}
                    >
                        {button} <Badge className={'border-blue-400 h-5 ml-1'} variant={'outline'}>TON</Badge>
                    </Button>
                )}
            </div>
            <Input
                type={'number'}
                value={value}
                onChange={(e)=>setValue(Number(e.target.value))}
                className={'w-1/4'}
                min={0}
            />
            <Button
                variant={'secondary'}
                onClick={handlePay}
                className={'mt-2'}
                disabled={isLoading}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send transaction
            </Button>
        </div>
    );
};

export default Pay;