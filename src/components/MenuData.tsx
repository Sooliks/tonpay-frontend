'use client'
import React, {useEffect, useState} from 'react';
import Menu, {MenuBar} from "@/components/Menu";
import {useAuth} from "@/hooks/useAuth";
import {useInitData} from "@telegram-apps/sdk-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import axiosInstance from "@/configs/axios";

const MenuData = () => {
    const auth = useAuth();
    const initData = useInitData()
    const [bars,setBars] = useState<MenuBar[]>([
        {
            title: 'Home',
            path: '/'
        },
        {
            title: 'Categories',
            items: [
                {title: 'Last sales', path: '/lastsales', individual: true},
                {title: 'PC', path: 'pc_games', shortcut: 'Games'},
                {title: 'Mobile', path: 'mobile_games', shortcut: 'Games'},
                {title: 'Telegram Mini Apps', path: 'tg_mini_app_game'},
                {title: 'Social networks', path: 'social_network'},
                {title: 'Real live', path: 'real_live', disabled: true},
            ],
            path: 'buy'
        },
        {
            title: 'Messages',
            path: 'messages'
        },
        {
            title:
                <div className={'flex items-center'}>
                    <Avatar className={'h-6 w-6'}>
                        <AvatarImage src={auth.user?.photoUrl}/>
                        <AvatarFallback>{initData!.user!.firstName[0]}</AvatarFallback>
                    </Avatar>
                    <span className={'ml-2'}>Me</span>
                </div>,
            items: [
                {title: 'Profile', path: auth.user!.id, separator: true},
                {title: 'Wallet', shortcut: `${auth.user!.money.toFixed(6)} TON`, path: 'wallet'},
                {title: 'Settings', path: 'settings', separator: true},
                {title: 'My sales', path: 'sales'},
                {title: 'Orders', path: 'orders'}
            ],
            path: 'profile'
        }
    ])
    useEffect(()=>{
        setBars(prev=>{
            if(prev[2].items) prev[2].items[1].shortcut = `${auth.user!.money.toFixed(6)} TON`;
            return prev;
        })
    },[auth.user?.money])
    useEffect(()=>{
        if(auth.user!.role === 'ADMIN' || auth.user!.role === 'CREATOR' ){
            axiosInstance.get('/stats/counts').then(res=>{
                if(res?.data){
                    setBars([
                        {
                            title:
                                <Tooltip delayDuration={200}>
                                    <TooltipTrigger>A</TooltipTrigger>
                                    <TooltipContent>
                                        <p>Admin panel</p>
                                    </TooltipContent>
                                </Tooltip>,
                            path: 'admin',
                            items: [
                                {title: 'Categories', path: 'scopes'},
                                {title: 'Admins', path: 'admins'},
                                {title: 'Users', path: 'users'},
                                {
                                    title: res.data?.countSales > 0 ?
                                            <p className={'flex items-center'}>Sales <Badge className={'ml-1'}>{res.data.countSales}</Badge></p>
                                            :
                                            'Sales',
                                    path: 'sales'
                                },
                                {title: 'Statistic', path: 'stats'},
                                {
                                    title: res.data?.countReports > 0 ?
                                        <p className={'flex items-center'}>Reports <Badge className={'ml-1'}>{res.data.countReports}</Badge></p>
                                        :
                                        'Reports',
                                    path: 'reports'
                                }
                            ]
                        }, ...bars
                    ])
                }
            })
        }
    },[])
    return (
        <Menu
            bars={bars}
        />
    );
};

export default MenuData;