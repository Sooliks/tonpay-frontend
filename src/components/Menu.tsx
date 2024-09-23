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
import {Path} from "path-scurry";


type MenuItem = {
    title: string
    separator?: boolean
    shortcut?: string
    path: string
}

type MenuBar = {
    title: string
    items: MenuItem[]
    path: string
}


type MenuProps = {
    bars: MenuBar[]
}

const Menu = ({bars}: MenuProps) => {
    return (
        <Menubar className={'rounded-t-none flex justify-between'}>
            {bars.map(bar=>
                <MenubarMenu key={bar.title}>
                    <MenubarTrigger>{bar.title}</MenubarTrigger>
                    <MenubarContent>
                        {bar.items.map(item=>
                            <>
                                <Link href={`/${bar.path}/${item.path}`}>
                                    <MenubarItem>
                                        {item.title} {item.shortcut && <MenubarShortcut>{item.shortcut}</MenubarShortcut>}
                                    </MenubarItem>
                                </Link>
                                {item.separator && <MenubarSeparator />}
                            </>
                        )}
                    </MenubarContent>
                </MenubarMenu>
            )}
        </Menubar>

    );
};

export default Menu;