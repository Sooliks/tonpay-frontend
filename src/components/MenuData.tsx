'use client'
import React from 'react';
import Menu from "@/components/Menu";
import {useAuth} from "@/hooks/useAuth";

const MenuData = () => {
    const auth = useAuth();
    return (
        <Menu
            bars={[
                {
                    title: 'Buy',
                    items: [{title: 'Warface', shortcut: 'говно', path: 'warface'}],
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
                        {title: 'Wallet', shortcut: '2.3 TON', path: 'wallet'},
                        {title: 'Settings', path: 'settings', separator: true},
                        {title: 'My sales', path: 'sales'}
                    ],
                    path: 'profile'
                }
            ]}
        />
    );
};

export default MenuData;