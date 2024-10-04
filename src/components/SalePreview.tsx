'use client'
import React from 'react';
import {Sale} from "@/types/sale";
import {Card} from "@/components/ui/card";

const SalePreview = ({sale}:{sale: Sale}) => {
    return (
        <Card className={'flex flex-col w-full'}>
            <h1>{sale.title}</h1>
        </Card>
    );
};

export default SalePreview;