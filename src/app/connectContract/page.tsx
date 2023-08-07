'use client'

import Box from '@/components/Box';
import Button from '@/components/Button';
import Select from '@/components/Select';
import { useLoadContract } from '@/hooks/useLoadContract';
import { MetadataSources } from '@ethereum-sourcify/contract-call-decoder';
import { Badge, Chip, FormControl, Grid, Input, InputLabel, MenuItem, TextField, TextareaAutosize, Typography } from '@mui/material';
import { NextPage } from 'next';
import React, { FC, useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';


export const Index: NextPage = () => {
    const [address, setAddress] = useState<string>('')
    const [chainId, setChainId] = useState<number>(0)
    const [manualAbi, setManualAbi] = useState<string>('')
    const {
        loadContractMetadata,
        loadingState,
        loadContract,
        resetState
    } = useLoadContract(address);

    const client = usePublicClient();

    useEffect(() => {
        const getChainId = async () => {
            const chainId = await client.getChainId();
            setChainId(chainId);
        }

        getChainId();
    }, [client]);

    const [metadataSource, setMetadataSource] = useState<number | string>('');

    const handleLoad = async () => {
        if (loadingState === 'metadata-not-found') {
            loadContract(address, manualAbi);
        } else {
            loadContractMetadata(metadataSource as unknown as MetadataSources, chainId);
        }
    }





    return (<>
        <Box>
            <Typography variant='h5'>
                Connect Contract - <Chip label={loadingState} />
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
                            value={metadataSource}
                            label='Metadata source'

                        >
                            <MenuItem value="" defaultChecked disabled>Select metadata source</MenuItem>
                            <MenuItem value="0">Sourcify</MenuItem>
                            <MenuItem value="1">Bytecode</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={4} item>
                    <FormControl fullWidth sx={{ mt: 3 }}>
                        <TextField
                            onChange={(e) => setChainId(isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value))}
                            value={chainId}
                            id="chain-id"
                            label="Chain ID"
                            variant="outlined"
                            fullWidth
                        />
                    </FormControl>
                </Grid>
            </Grid>

            {loadingState === 'metadata-not-found' &&
                (<>
                    <TextField
                        multiline
                        rows={5}
                        sx={{ mt: 3 }}
                        id="outlined-basic"
                        label="Paste ABI"
                        variant="outlined"
                        fullWidth
                    />
                </>)
            }


            {loadingState !== 'contract-loaded' && <>
                <Button neon fullWidth sx={{ mt: 3, background: 'primary.main', color: 'white' }}
                    disabled={address === ''}
                    onClick={handleLoad}
                >
                    {(loadingState === 'none' || loadingState === 'invalid-address') ? 'Connect' :
                        loadingState === 'metadata-not-found' ? 'Load ABI' : 'Loading...'
                    }
                </Button>
            </>}


            {loadingState === 'contract-loaded' && <>
                <Typography variant='h5' sx={{ mt: 3 }}>
                    Contract loaded
                </Typography>
                <Typography variant='body1' sx={{ mt: 3 }}>
                    You can use it in the workspace.
                </Typography>

                <Button neon fullWidth sx={{ mt: 3, background: 'primary.main', color: 'white' }}
                    onClick={async () => {
                        setAddress('');
                        setMetadataSource('');
                        setChainId(await client.getChainId() ?? 1);
                        setManualAbi('');
                        resetState();
                    }}
                >
                    Load another contract
                </Button>
            </>}


        </Box >
    </>);
}

export default Index;