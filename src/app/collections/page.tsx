'use client'

import Box from '@/components/Box';
import Button from '@/components/Button';
import { AddCollectionModal } from '@/store/features/collections/components/AddCollectionModal';
import { Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import React, { FC, useState } from 'react';


export const Index: NextPage = () => {
    const [open, setOpen] = useState(false);

    const handleAdd = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Box>
                <Grid container spacing={2}>
                    <Grid xs={9} item>
                        <Typography variant='h4'>
                            Manage Collections
                        </Typography>
                    </Grid>
                    <Grid xs={3} item>
                        <Button onClick={handleAdd} fullWidth variant='contained'>
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </Box>



            <AddCollectionModal open={open} onClose={handleClose} />
        </>
    );
}

export default Index;