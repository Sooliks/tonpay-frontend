'use client'
import React from 'react';
import Menu from "@/components/Menu";

const MenuData = () => {
    return (
        <Menu
            bars={[
                {
                    title: 'Categories',
                    items: [{title: 'Warface', shortcut: 'говно', path: 'warface'}],
                    path: 'category'
                },
                {
                    title: 'Messages',
                    path: 'messages'
                },
                {
                    title: 'Profile',
                    items: [
                        {title: 'Wallet', shortcut: '2.3 TON', path: 'wallet', disabled: true},
                        {title: 'Recharge', path: 'recharge'},
                        {title: 'Settings', path: 'settings', separator: true},
                        {title: 'My sales', path: 'mysales'}
                    ],
                    path: 'profile'
                }
            ]}
        />
    );
};

export default MenuData;