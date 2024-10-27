'use client'
import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

const OrdersPage = () => {
    return (
        <div className={'w-full p-4'}>
            <Tabs defaultValue="payment" className={'flex flex-col items-center mt-2 w-full'}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="payment">My orders</TabsTrigger>
                    <TabsTrigger value="withdrawal">Withdrawal</TabsTrigger>
                </TabsList>
                <TabsContent value="payment"></TabsContent>
                <TabsContent value="withdrawal"></TabsContent>
            </Tabs>
        </div>
    );
};

export default OrdersPage;