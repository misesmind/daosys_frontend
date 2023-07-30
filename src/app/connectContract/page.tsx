'use client'

import Box from '@/components/Box';
import Button from '@/components/Button';
import Select from '@/components/Select';
import { useLoadContract } from '@/hooks/useLoadContract';
import { MetadataSources } from '@ethereum-sourcify/contract-call-decoder';
import { FormControl, Grid, InputLabel, MenuItem, TextField, Typography } from '@mui/material';
import { NextPage } from 'next';
import React, { FC, useState } from 'react';


export const Index: NextPage = () => {
    const [address, setAddress] = useState<string>('')
    const {
        loadContractMetadata,
        loadingState
    } = useLoadContract(address);

    const [metadataSource, setMetadataSource] = useState<number>(0);

    const handleLoad = () => {
        loadContractMetadata(metadataSource);
    }



    return (<>
        <Box>
            <Typography variant='h5'>
                Connect Contract - {loadingState}
            </Typography>
        </Box>

        <Box mt={3}>
            <FormControl fullWidth>
                <TextField
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    id="outlined-basic"
                    label="Contract Address"
                    variant="outlined"
                    fullWidth
                />
            </FormControl>

            <Grid container spacing={2}>
                <Grid xs={4} item>
                    <FormControl fullWidth sx={{ mt: 3 }}>
                        <InputLabel id="metadata-source-label">Metadata source</InputLabel>
                        <Select fullWidth
                            labelId='metadata-source-label'
                            onChange={(e) => setMetadataSource(parseInt(e.target.value as string))}
                            id='metadata-source'
                            label='Metadata source'
                            defaultValue={metadataSource}
                        >
                            <MenuItem value="0">Sourcify</MenuItem>
                            <MenuItem value="1">Bytecode</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>


            {loadingState === 'none' && (<>
                <Button neon fullWidth sx={{ mt: 3, background: 'primary.main', color: 'white' }}
                    disabled={address === ''}
                    onClick={handleLoad}
                >
                    Connect
                </Button>
            </>)}

        </Box >
    </>);
}

export default Index;