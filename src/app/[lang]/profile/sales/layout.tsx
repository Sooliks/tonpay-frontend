'use client'
import React, {useState} from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {Loader2} from "lucide-react";
import axiosInstance from "@/configs/axios";
import {toast} from "@/hooks/use-toast";
import {AxiosError} from "axios";
import {useTranslation} from "@/hooks/useTranslation";

const SalesProfileLayout = ({children}:{children: React.ReactNode}) => {
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {translations} = useTranslation();
    const handleBoostSales = () => {
        setIsLoading(true)
        axiosInstance.post('/sales/up').then(res=>{
            if(res.status === 201) {
                toast({description: `Sales boosted`})
            }
        }).finally(() => setIsLoading(false)).catch((error: AxiosError)=>{
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast({description: errorMessage})
        })
    }
    return (
        <div className={'p-4'}>
            <div className={'flex justify-between items-center'}>
                <Link href={pathname === '/profile/sales/add' ? '/profile/sales' : '/profile/sales/add'}>
                    <Button variant={'secondary'}>{pathname === '/profile/sales/add' ? translations.frequent.back : translations.profile.sales.addNewButton}</Button>
                </Link>
                <Button
                    disabled={isLoading}
                    onClick={handleBoostSales}
                >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {translations.profile.sales.boostSales}
                </Button>
            </div>
            {children}
        </div>
    );
};

export default SalesProfileLayout;