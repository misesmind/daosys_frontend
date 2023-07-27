'use client'

import React, { FC, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@/components/AppBar';
import Button from '@/components/Button';
import { Select } from '@mui/material';
import { useSelectedCollection } from '@/store/features/userPreferences/hooks/useSelectedCollection'

export const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
    const { selectedCollection } = useSelectedCollection();

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" open={true}>
                <Toolbar>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        DaoSYS UI
                    </Typography>
                    <Select
                        value={selectedCollection}
                        label="Collection"
                    >

                    </Select>
                    <ConnectButton />
                </Toolbar>
            </AppBar>

            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    {children}
                </Container>
            </Box>
        </Box>
    );
}