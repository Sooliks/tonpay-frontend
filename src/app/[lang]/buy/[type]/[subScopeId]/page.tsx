'use client'
import React, {useCallback, useEffect, useState} from 'react';
import {Sale} from "@/types/sale";
import SpinLoading from "@/components/my-ui/SpinLoading";
import SalePreview from "@/components/SalePreview";
import {getNameByPath} from "@/services/navService";
import Tree from "@/components/my-ui/Tree";
import useSWRInfinite from "swr/infinite";
import InfiniteScroll from "react-infinite-scroll-component";
import {Skeleton} from "@/components/ui/skeleton";
import {Input} from "@/components/ui/input";

type BuyLayoutProps = {
    params: {
        subScopeId: string
    }
}
const COUNT_ON_PAGE = 10;

const SalesPage = ({params}: BuyLayoutProps) => {
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    const getKey = useCallback((pageIndex: number, previousPageData: Sale[] | null) => {
        if (previousPageData && !previousPageData.length) return null;
        return `/sales/bysubscope/${params.subScopeId}?count=${COUNT_ON_PAGE}&skip=${pageIndex * COUNT_ON_PAGE}${debouncedSearchTerm && `&search=${debouncedSearchTerm}`}`;
    }, [debouncedSearchTerm]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { data, error, isLoading, size, setSize } = useSWRInfinite<Sale[]>(getKey)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 690);

        return () => clearTimeout(handler);
    }, [searchTerm]);
    if(isLoading){
        return <SpinLoading/>
    }
    const items = data?.flat() || [];
    return (
        <div className={'p-4'}>
            {items.length > 0 &&
                <Tree
                    type={{href: `/buy/${items[0].subScope.scope.type}`, name: getNameByPath(items[0].subScope.scope.type) || ''}}
                    scope={{href: `/buy/${items[0].subScope.scope.type}?open=${items[0].subScope.scope.name}`, name: items[0].subScope.scope.name}}
                    subScope={{href: `/buy/${items[0].subScope.scope.type}/${items[0].subScope.id}`, name: items[0].subScope.name}}
                />
            }
            <Input
                value={searchTerm}
                type="text"
                placeholder="Search"
                onChange={(e)=>setSearchTerm(e.target.value)}
                className={'mb-4'}
            />
            {data && items.length > 0 ?
                <InfiniteScroll
                    dataLength={items.length}
                    next={()=>setSize(size+1)}
                    hasMore={data[data.length - 1]?.length === COUNT_ON_PAGE}
                    loader={<Skeleton/>}
                    scrollableTarget="scrollableDiv"
                >
                    <div className={'flex flex-col flex-wrap'}>
                        {data.length > 0 ? data.map(sale=> (sale.map(s=> <SalePreview sale={s} key={s.id} isProfile={false} rate/>)))
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