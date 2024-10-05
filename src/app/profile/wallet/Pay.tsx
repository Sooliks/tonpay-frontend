'use client'
import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";

const buttons: number[] = [0.5, 1, 5, 10, 20, 100]

const Pay = ({onPay, isLoading}:{onPay: (amount: number) => void, isLoading: boolean}) => {
    const [value,setValue] = useState<number>(0.5);
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
            />
            <Button
                variant={'secondary'}
                onClick={()=>onPay(value)}
                className={'mt-2'}
            >
                Send transaction
            </Button>
        </div>
    );
};

export default Pay;