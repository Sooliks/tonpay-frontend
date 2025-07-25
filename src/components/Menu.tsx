'use client'
import React from 'react';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu, MenubarSeparator, MenubarShortcut,
    MenubarTrigger
} from "@/components/ui/menubar";
import Link from "next/link";

type MenuItem = {
    title: string | React.ReactNode
    separator?: boolean
    shortcut?: string
    path: string
    disabled?: boolean
    individual?: boolean
}

export type MenuBar = {
    title: string | React.ReactNode
    items?: MenuItem[]
    path: string
}


type MenuProps = {
    bars: MenuBar[]
}

const Menu = ({bars}: MenuProps) => {
    return (
        <Menubar className={'rounded-t-none flex rounded-b-lg border-b-2 border-b-[#757575] h-16 justify-around sticky top-0'}>
            {bars.map((bar, index)=>
                <MenubarMenu key={index}>
                    {bar.items ?
                        <MenubarTrigger>
                            {bar.title}
                        </MenubarTrigger>
                        :
                        <Link href={`/${bar.path}`}>
                            <MenubarTrigger>
                                {bar.title}
                            </MenubarTrigger>
                        </Link>
                    }
                    {bar.items &&
                        <MenubarContent>
                            {bar.items.map((item, index)=>
                                <>
                                    <Link
                                        key={index}
                                        href={item.individual ? item.path : `/${bar.path}/${item.path}`} className={item.disabled ? 'pointer-events-none' : undefined}
                                    >
                                        <MenubarItem disabled={item.disabled}>
                                            {item.title}
                                            {item.shortcut &&
                                                <MenubarShortcut className={item.shortcut.length > 20 ? 'ml-1' : undefined}>
                                                    {item.shortcut}
                                                </MenubarShortcut>
                                            }
                                        </MenubarItem>
                                    </Link>
                                    {item.separator && <MenubarSeparator />}
                                </>
                            )}
                        </MenubarContent>
                    }
                </MenubarMenu>
            )}
        </Menubar>

    );
};

export default Menu;