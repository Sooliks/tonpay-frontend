'use client'
import React from 'react';
import useSWR from "swr";
import {Sale} from "@/types/sale";
import SpinLoading from "@/components/my-ui/SpinLoading";
import SalePreview from "@/components/SalePreview";
import {getNameByPath} from "@/services/navService";
import Tree from "@/components/my-ui/Tree";

type BuyLayoutProps = {
    params: {
        subScopeId: string
    }
}
const SalesPage = ({params}: BuyLayoutProps) => {
    const { data, error, isLoading } = useSWR<Sale[]>(`/sales/bysubscope/${params.subScopeId}`)
    if(isLoading){
        return <SpinLoading/>
    }
    return (
        <div className={'p-4'}>
            {data && data.length > 0 &&
                <Tree
                    type={{href: `/buy/${data[0].subScope.scope.type}`, name: getNameByPath(data[0].subScope.scope.type) || ''}}
                    scope={{href: `/buy/${data[0].subScope.scope.type}?open=${data[0].subScope.scope.name}`, name: data[0].subScope.scope.name}}
                    subScope={{href: `/buy/${data[0].subScope.scope.type}/${data[0].subScope.id}`, name: data[0].subScope.name}}
                />
            }
            {data && data.length > 0 ? data.map(sale=> <SalePreview sale={sale} key={sale.id} isProfile={false}/>)
                :
                <p className={'text-center text-muted-foreground text-2xl mt-24'}>Nothing</p>
            }
        </div>
    );
};

export default SalesPage;