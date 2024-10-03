'use client'
import React from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {usePathname, useRouter} from "next/navigation";
import {Separator} from "@/components/ui/separator";

const SalesProfileLayout = ({children}:{children: React.ReactNode}) => {
    const pathname = usePathname()
    const {back} = useRouter()
    return (
        <div className={'p-4'}>
            <Link href={pathname === '/profile/sales/add' ? '/profile/sales' : '/profile/sales/add'}>
                <Button variant={'secondary'}>{pathname === '/profile/sales/add' ? 'Back' : 'Add new'}</Button>
            </Link>
            <Card className={'p-4 mt-2'}>
                <h1 className={'text-center'}>Add new product</h1>
                <Separator className={'my-1'}/>
                {children}
            </Card>
        </div>
    );
};

export default SalesProfileLayout;