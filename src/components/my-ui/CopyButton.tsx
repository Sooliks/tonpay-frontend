'use client'
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Copy, CopyCheck} from "lucide-react";
import {toast} from "@/hooks/use-toast";

const CopyButton = (
        {
            copyText,
            textButton = 'Copy link',
            variant = 'secondary',
            refTelegram = true,
            className,
            size = 'sm',
            notify = true
        }
        :
        {
            copyText: string
            textButton?: string
            variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined,
            refTelegram?: boolean,
            className?: string,
            size?: 'sm' | 'lg' | 'default',
            notify?: boolean
        }
) => {
    const [isCopied, setCopied] = useState<boolean>(false);
    const handleClick = () => {
        if(isCopied)return;
        const text = refTelegram ? `https://t.me/PayOnTonBot/app?startapp=url${copyText}` : copyText;
        navigator.clipboard.writeText(text).then(()=>{
            setCopied(true);
            if(notify){
                toast({description: 'Copied'})
            }
            setTimeout(()=>{
                setCopied(false)
            }, 2000)
        });
    }
    return (
        <Button
            variant={variant}
            onClick={handleClick}
            className={className}
            size={size}
        >
            {textButton}
            {isCopied ? <CopyCheck className={'h-4 w-4 ml-2'} /> : <Copy className={'h-4 w-4 ml-2'} />}
        </Button>
    );
};

export default CopyButton;