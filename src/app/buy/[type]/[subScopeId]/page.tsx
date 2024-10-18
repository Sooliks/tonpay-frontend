'use client'
import React from 'react';
import {Sale} from "@/types/sale";
import SpinLoading from "@/components/my-ui/SpinLoading";
import SalePreview from "@/components/SalePreview";
import {getNameByPath} from "@/services/navService";
import Tree from "@/components/my-ui/Tree";
import useSWRInfinite from "swr/infinite";
import InfiniteScroll from "react-infinite-scroll-component";
import {Skeleton} from "@/components/ui/skeleton";

type BuyLayoutProps = {
    params: {
        subScopeId: string
    }
}
const COUNT_ON_PAGE = 10;

const SalesPage = ({params}: BuyLayoutProps) => {
    const getKey = (pageIndex: number, previousPageData: Sale[] | null) => {
        if (previousPageData && !previousPageData.length) return null;
        return `/sales/bysubscope/${params.subScopeId}?count=${COUNT_ON_PAGE}&skip=${pageIndex * COUNT_ON_PAGE}`;
    };
    const { data, error, isLoading, size, setSize } = useSWRInfinite<Sale[]>(getKey)
    if(isLoading){
        return <SpinLoading/>
    }
    const items = data?.flat() || [];
    return (
        <div className={'p-4'}>
            {data && data.length > 0 &&
                <Tree
                    type={{href: `/buy/${data[0][0].subScope.scope.type}`, name: getNameByPath(data[0][0].subScope.scope.type) || ''}}
                    scope={{href: `/buy/${data[0][0].subScope.scope.type}?open=${data[0][0].subScope.scope.name}`, name: data[0][0].subScope.scope.name}}
                    subScope={{href: `/buy/${data[0][0].subScope.scope.type}/${data[0][0].subScope.id}`, name: data[0][0].subScope.name}}
                />
            }
            {data ?
                <InfiniteScroll
                    dataLength={items.length}
                    next={()=>setSize(size+1)}
                    hasMore={data[data.length - 1]?.length === COUNT_ON_PAGE}
                    loader={<Skeleton/>}
                    scrollableTarget="scrollableDiv"
                >
                    <div className={'flex flex-col'}>
                        {data.length > 0 ? data.map(sale=> (sale.map(s=> <SalePreview sale={s} key={s.id} isProfile={false}/>)))
                            :
                            <p className={'text-center text-muted-foreground text-2xl mt-24'}>Nothing</p>
                        }
                    </div>
                </InfiniteScroll>
                :
                <p className={'text-center text-muted-foreground text-2xl mt-24'}>Nothing</p>
            }
        </div>
    );
};

export default SalesPage;