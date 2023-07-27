'use client';

import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
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

    const handleClick = (link: SidebarLink) => {

    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <List component={"nav"} aria-label="main list daosys">
                {links && links.map((link, index) => (
                    <ListItemButton key={index}
                        onClick={() => handleClick(link)}
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