'use client'
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useAuth} from "@/hooks/useAuth";
import axiosInstance from "@/configs/axios";
import {useTonConnectUI} from "@tonconnect/ui-react";
import {Loader2} from "lucide-react";
import {toast} from "@/hooks/use-toast";

const Withdrawal = () => {
    const auth = useAuth()
    const [amount,setAmount] = useState<number>(auth.user?.money || 0)
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [tonConnectUi] = useTonConnectUI()
    const handleWithdraw = () => {
        if(!tonConnectUi.account?.address){
            alert('Please connect your wallet')
            return
        }
        setIsLoading(true)
        axiosInstance.post('/ton/withdraw', {amount: amount, address: tonConnectUi.account.address}).then(data=>{
            if(data.status === 201){
                toast({description: 'Success, check your wallet'})
            }else {
                toast({description: `Error: ${data.statusText}`})
            }
        }).finally(()=>setIsLoading(false))
    }
    return (
        <div className={'flex flex-col items-center w-full'}>
            <Input
                type={'number'}
                defaultValue={auth.user?.money}
                value={amount}
                onChange={(e)=>setAmount(Number(e.target.value))}
                max={amount}
                min={0.002}
            />
            <Button
                onClick={handleWithdraw}
                className={'mt-2'}
                disabled={isLoading}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Withdrawal
            </Button>
        </div>
    );
};

export default Withdrawal;