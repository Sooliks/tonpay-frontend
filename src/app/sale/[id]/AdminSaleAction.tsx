'use client'
import React from 'react';
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";

const AdminSaleAction = () => {
    const handleAccept = () => {
      
    }
    const handleDecline = () => {

    }
    
    return (
        <Card className={'flex mt-2 p-4'}>
            <h6>Admin actions</h6>
            <Button className={'mr-2'} onClick={handleAccept}>Accept</Button>
            <Button variant={'destructive'} onClick={handleDecline}>Decline</Button>
        </Card>
    );
};

export default AdminSaleAction;