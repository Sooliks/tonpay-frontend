'use client'
import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import MyPurchases from "@/app/profile/orders/MyPurchases";
import MySales from "@/app/profile/orders/MySales";

const OrdersPage = () => {
    return (
        <div className={'w-full p-4'}>
            <Tabs defaultValue="payment" className={'flex flex-col items-center mt-2 w-full'}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="payment">My purchases</TabsTrigger>
                    <TabsTrigger value="withdrawal">My sales</TabsTrigger>
                </TabsList>
                <TabsContent value="payment"><MyPurchases/></TabsContent>
                <TabsContent value="withdrawal"><MySales/></TabsContent>
            </Tabs>
        </div>
    );
};

export default OrdersPage;