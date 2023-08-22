'use client'

import { Autocomplete, Badge, Box, Grid, IconButton, TextField, Typography } from "@mui/material"
import React, { FC, useState, useMemo } from "react"
import { useContractsList } from "../hooks/useContractsList"
import { useAppDispatch } from "@/store/hooks";
import useTabs from "../../tabs/hooks/useTabs";
import Button from "@/components/Button";
import formatAddress from "@/helpers/formatAddress";
import { Add, CloseOutlined } from "@mui/icons-material";

export type ContractSelectorProps = {
    tabId: string | undefined | number;
    setDynamicGrid: React.Dispatch<React.SetStateAction<number>>;
}

export const ContractSelector: FC<ContractSelectorProps> = (props: ContractSelectorProps) => {
    const { contracts, findContract } = useContractsList({});

    const [show, setShow] = useState(false);

    const dispatch = useAppDispatch();
    const { tabs } = useTabs();

    const tabInfo = useMemo(() => {
        return tabs.find(tab => tab.id === props.tabId);
    }, [props.tabId, tabs]);

    const handleSelect = (address: string | undefined) => {

        dispatch({
            type: 'tabs/setTabContractAddress',
            payload: {
                id: props.tabId,
                contractAddress: address
            }
        })
    }

    if (show === false) return (
        <>
            <Box>
                <Button variant={'text'} neon onClick={() => {
                    setShow(true);
                    props.setDynamicGrid(12);
                }}>{tabInfo?.contractAddress ? formatAddress(tabInfo.contractAddress) : 'Select contract'}</Button>
            </Box>
        </>
    );

    return (
        <>
            <Box>
                <Grid container gap={0} sx={{
                    mb: 2
                }}>
                    <Grid item xs={4}>
                        <Typography variant="h6">Current contract</Typography>
                    </Grid>
                    <Grid item xs={4}>

                        <Typography variant="h6">{tabInfo?.contractAddress}</Typography>
                    </Grid>
                </Grid>
                <Grid container gap={1}>
                    <Grid item xs={7}>
                        <Autocomplete
                            size="small"
                            disablePortal
                            onChange={(e, v) => {
                                handleSelect(v?.[0]);
                            }}
                            id="contract-selector"
                            options={contracts}
                            renderInput={(params) => <TextField {...params} label="Select contract" />}
                            getOptionLabel={(option) => option[0]}
                            isOptionEqualToValue={(option, value) => option[0] === value?.[0]}
                            renderOption={(props, option) => (
                                <li {...props} key={option[0]}>
                                    {option[0]}
                                </li>
                            )}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton onClick={() => {
                            handleSelect(tabInfo?.contractAddress);
                            setShow(false);
                            props.setDynamicGrid(4);
                        }}>
                            <Add />
                        </IconButton>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton onClick={() => {
                            setShow(false);
                            props.setDynamicGrid(4);
                        }
                        }>
                            <CloseOutlined />
                        </IconButton>
                    </Grid>

                </Grid>

            </Box>




        </>
    )
}