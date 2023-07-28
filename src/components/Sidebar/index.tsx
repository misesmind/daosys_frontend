'use client';

import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useRouter, usePathname } from "next/navigation";
import React, { FC } from "react"

export type SidebarLink = {
    name: string;
    path: string;
    icon: React.ReactNode;
    children?: SidebarLink[];
}

export interface SidebarProps {
    links: SidebarLink[]
}

export const Sidebar: FC<SidebarProps> = ({ links }) => {

    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (link: SidebarLink) => {
        router.push(link.path);
    };

    return (
        <Box sx={{
            flexGrow: 1,
            border: '1px solid rgba(0, 0, 0, 0.2)',
            boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
        }}>
            <List component={"nav"} aria-label="main list daosys"
            >
                {links && links.map((link, index) => (
                    <ListItemButton key={index}
                        onClick={() => handleClick(link)}
                        selected={pathname === link.path}
                    >
                        <ListItemIcon>
                            {link.icon}
                        </ListItemIcon>
                        <ListItemText primary={link.name} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    )
}

export default Sidebar