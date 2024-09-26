'use client'
import React, {useEffect, useState} from 'react';
import Menu from "@/components/Menu";
import {useAuth} from "@/hooks/useAuth";

const MenuData = () => {
    const auth = useAuth();
    const [bars,setBars] = useState([
        {
            title: 'Buy',
            items: [
                {title: 'PC', path: 'pc_games', shortcut: 'Games'},
                {title: 'Mobile', path: 'mobile_games', shortcut: 'Games'},
                {title: 'Telegram Mini Apps', path: 'tg_mini_app_game'},
                {title: 'Social network', path: 'social_network'},
            ],
            path: 'buy'
        },
        {
            title: 'Messages',
            path: 'messages'
        },
        {
            title: 'Profile',
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
        if(auth.user!.role === 'ADMIN' || auth.user!.role === 'CREATOR' ){
            setBars([{title: 'Admin', path: 'admin'}, ...bars])
        }
    },[])
    return (
        <Menu
            bars={bars}
        />
    );
};

export default MenuData;