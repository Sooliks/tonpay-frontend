'use client'
import React, {useEffect, useState} from 'react';
import Menu from "@/components/Menu";
import {useAuth} from "@/hooks/useAuth";
import {useInitData} from "@telegram-apps/sdk-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const MenuData = () => {
    const auth = useAuth();
    const initData = useInitData()
    const [bars,setBars] = useState([
        {
            title: 'Buy',
            items: [
                {title: 'PC', path: 'pc_games', shortcut: 'Games'},
                {title: 'Mobile', path: 'mobile_games', shortcut: 'Games'},
                {title: 'Telegram Mini Apps', path: 'tg_mini_app_game'},
                {title: 'Social network', path: 'social_network'},
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
                        <AvatarImage src={initData?.chat?.photoUrl}/>
                        <AvatarFallback>{initData!.user!.firstName[0]}</AvatarFallback>
                    </Avatar>
                    <span className={'ml-2'}>Profile</span>
                </div>,
            items: [
                {title: 'Profile', path: auth.user!.id, separator: true},
                {title: 'Wallet', shortcut: `${auth.user!.money.toFixed(6)} TON`, path: 'wallet'},
                {title: 'Settings', path: 'settings', separator: true},
                {title: 'My sales', path: 'sales'}
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
            setBars([
                {
                    title: 'Admin',
                    path: 'admin',
                    items: [
                        {title: 'Scopes', path: 'scopes'}
                    ]
                }, ...bars
            ])
        }
    },[])
    return (
        <Menu
            bars={bars}
        />
    );
};

export default MenuData;