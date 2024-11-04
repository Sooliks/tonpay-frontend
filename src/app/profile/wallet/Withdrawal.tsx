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

const Withdrawal = () => {
    //const auth = useAuth()
    const [amount,setAmount] = useState<number>(0)
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [tonConnectUi] = useTonConnectUI()
    const handleWithdraw = () => {
        try {
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
        }catch (e) {
            
        }
    }
    return (
        <div className={'flex flex-col items-center w-full'}>
            <div>
                <Label htmlFor="in">Fee {10}%</Label>
                <Input
                    className={'w-56'}
                    id={'in'}
                    type={'number'}
                    value={amount}
                    onChange={(e)=>setAmount(Number(e.target.value))}
                    min={0.05}
                />
            </div>
            <Button
                onClick={handleWithdraw}
                className={'mt-2 w-56'}
                disabled={isLoading}
                variant={'secondary'}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Withdrawal
            </Button>
        </div>
    );
};

export default Withdrawal;