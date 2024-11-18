'use client'
import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import MyPurchases from "@/app/[lang]/profile/orders/MyPurchases";
import MySales from "@/app/[lang]/profile/orders/MySales";
import {useTranslation} from "@/hooks/useTranslation";

const OrdersPage = () => {
    const {translations} = useTranslation();
    return (
        <div className={'w-full p-4'}>
            <Tabs defaultValue="purchases" className={'flex flex-col items-center mt-2 w-full'}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="purchases">{translations.profile.orders.myPurchases}</TabsTrigger>
                    <TabsTrigger value="sales">{translations.profile.orders.mySales}</TabsTrigger>
                </TabsList>
                <TabsContent value="purchases"><MyPurchases/></TabsContent>
                <TabsContent value="sales"><MySales/></TabsContent>
            </Tabs>
        </div>
    );
};

export default OrdersPage;