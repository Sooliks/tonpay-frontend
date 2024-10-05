'use client'
import React from 'react';
import useSWR from "swr";
import {Sale} from "@/types/sale";
import SpinLoading from "@/components/my-ui/SpinLoading";
import SalePreview from "@/components/SalePreview";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {getNameByPath} from "@/services/navService";
import {Card} from "@/components/ui/card";


type BuyLayoutProps = {
    params: {
        subScopeId: string
    }
}
const SalesPage = ({params}: BuyLayoutProps) => {
    const { data, error, isLoading } = useSWR<Sale[]>(`/sales/?subScopeId=${params.subScopeId}`)
    if(isLoading){
        return <SpinLoading/>
    }
    return (
        <div className={'p-4'}>
            {data && data.length > 0 &&
                <Card className={'p-4 mb-4 sticky top-0'}>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink className={'text-blue-800'} href={`/buy/${data[0].subScope.scope.type}`}>{getNameByPath(data[0].subScope.scope.type)}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink className={'text-blue-800'} href={`/buy/${data[0].subScope.scope.type}?open=${data[0].subScope.scope.name}`}>{data[0].subScope.scope.name}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink className={'text-blue-800'} href={`/buy/${data[0].subScope.scope.type}/${data[0].subScope.id}`}>{data[0].subScope.name}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </Card>
            }
            {data && data.length > 0 ? data.map(sale=> <SalePreview sale={sale} key={sale.id} isProfile={false}/>)
                :
                <p className={'text-center text-muted-foreground text-2xl mt-24'}>Nothing</p>
            }
        </div>
    );
};

export default SalesPage;