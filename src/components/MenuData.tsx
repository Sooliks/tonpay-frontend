'use client'
import React, {useEffect, useState} from 'react';
import Menu, {MenuBar} from "@/components/Menu";
import {useAuth} from "@/hooks/useAuth";
import {useInitData} from "@telegram-apps/sdk-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import axiosInstance from "@/configs/axios";
import {useTranslation} from "@/hooks/useTranslation";

const MenuData = () => {
    const auth = useAuth();
    const { translations } = useTranslation();
    const initData = useInitData()
    const [bars,setBars] = useState<MenuBar[]>([
        {
            title: 'Earn',
            path: 'earn',
            items: [
                {title: 'Tasks', path: 'tasks'},
                {title: 'Referrals', path: 'referrals', shortcut: 'Earn TON for inviting friends'}
            ]
        },
        {
            title: translations.menu.main.categories,
            items: [
                {title: translations.menu.main.lastSales, path: '/lastsales', individual: true},
                {title: 'PC', path: 'pc_games', shortcut: 'Games'},
                {title: 'Mobile', path: 'mobile_games', shortcut: 'Games'},
                {title: 'Telegram Mini Apps', path: 'tg_mini_app_game'},
                {title: 'Social networks', path: 'social_network'},
                {title: 'Real live', path: 'real_live', disabled: true},
            ],
            path: 'buy'
        },
        {
            title: translations.menu.main.messages,
            path: 'messages'
        },
        {
            title:
                <div className={'flex items-center'}>
                    <Avatar className={'h-6 w-6'}>
                        <AvatarImage src={auth.user?.photoUrl}/>
                        <AvatarFallback>{initData!.user!.firstName[0]}</AvatarFallback>
                    </Avatar>
                    <span className={'ml-2'}>{translations.menu.profile.me}</span>
                </div>,
            items: [
                {title: translations.frequent.profile, path: auth.user!.id, separator: true},
                {title: translations.menu.profile.wallet, shortcut: `${auth.user!.money.toFixed(6)} TON`, path: 'wallet'},
                {title: translations.menu.profile.settings, path: 'settings', separator: true},
                {title: translations.menu.profile.mySales, path: 'sales'},
                {title: translations.menu.profile.orders, path: 'orders'}
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