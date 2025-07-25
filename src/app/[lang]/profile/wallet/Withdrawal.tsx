'use client'
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import axiosInstance from "@/configs/axios";
import {useTonConnectUI} from "@tonconnect/ui-react";
import {Loader2} from "lucide-react";
import {AxiosError} from "axios";
import {toast} from "@/hooks/use-toast";
import {Label} from "@/components/ui/label";
import {useAuth} from "@/hooks/useAuth";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {useTranslation} from "@/hooks/useTranslation";

const Withdrawal = () => {
    const auth = useAuth();
    const [amount,setAmount] = useState<number>(auth.user?.money || 0)
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [tonConnectUi] = useTonConnectUI()
    const {translations} = useTranslation();
    const handleWithdraw = ()=> {
        if (isLoading) return;
        setIsLoading(true)
        if (!tonConnectUi.account?.address) {
            toast({description: 'Please connect your wallet'})
            tonConnectUi.openModal()
            setIsLoading(false)
            return
        }
        toast({description: 'The withdraw has been sent, wait..'})
        axiosInstance.post('/ton/withdraw', {amount: amount, address: tonConnectUi.account.address}).then(data => {
            if (data.status === 201) {
                toast({description: 'Success, check your wallet'})
            }
        }).finally(() => setIsLoading(false)).catch((error: AxiosError) => {
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: `Error: ${errorMessage}`})
        })
    };
    return (
        <div className={'flex flex-col items-center w-full'}>
            <p className={'text-sm text-muted-foreground text-center'}>
                {auth.user?.isSubscribed ?
                    translations.profile.wallet.lowComm
                    :
                    <p>{translations.profile.wallet.highComm} <Link target={'_blank'} className={'text-sm text-blue-800'} href={'https://t.me/payonton'}>{translations.frequent.channel.toLowerCase()}</Link></p>
                }
            </p>
            <div>
                <Label htmlFor="in">
                    {auth.user?.isSubscribed ?
                        <p>{translations.frequent.fee} <del>15%</del> 10%</p>
                        :
                        <p>{translations.frequent.fee} <del>10%</del> 15%</p>
                    }
                </Label>
                <Input
                    className={'w-56'}
                    id={'in'}
                    type={'number'}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    max={auth.user?.money || 0}
                    min={0.05}
                />
            </div>
            <Button
                onClick={handleWithdraw}
                className={'mt-2 w-56'}
                disabled={isLoading}
                variant={'secondary'}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                {translations.profile.wallet.withdraw}
                <Badge className={'border-blue-400 h-5 ml-1'} variant={'outline'}>TON</Badge>
            </Button>
        </div>
    );
};

export default Withdrawal;