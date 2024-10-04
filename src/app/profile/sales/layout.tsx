'use client'
import React from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";

const SalesProfileLayout = ({children}:{children: React.ReactNode}) => {
    const pathname = usePathname()
    return (
        <div className={'p-4'}>
            <Link href={pathname === '/profile/sales/add' ? '/profile/sales' : '/profile/sales/add'}>
                <Button variant={'secondary'}>{pathname === '/profile/sales/add' ? 'Back' : 'Add new'}</Button>
            </Link>
            {children}
        </div>
    );
};

export default SalesProfileLayout;