'use client'
import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import MyPurchases from "@/app/[lang]/profile/orders/MyPurchases";
import MySales from "@/app/[lang]/profile/orders/MySales";

const OrdersPage = () => {
    return (
        <div className={'w-full p-4'}>
            <Tabs defaultValue="purchases" className={'flex flex-col items-center mt-2 w-full'}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="purchases">My purchases</TabsTrigger>
                    <TabsTrigger value="sales">My sales</TabsTrigger>
                </TabsList>
                <TabsContent value="purchases"><MyPurchases/></TabsContent>
                <TabsContent value="sales"><MySales/></TabsContent>
            </Tabs>
        </div>
    );
};

export default OrdersPage;