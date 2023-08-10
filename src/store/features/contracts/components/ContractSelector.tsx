'use client'

import { Autocomplete, Badge, Box, Grid, TextField, Typography } from "@mui/material"
import React, { FC, useState, useMemo } from "react"
import { useContractsList } from "../hooks/useContractsList"
import { useAppDispatch } from "@/store/hooks";
import useTabs from "../../tabs/hooks/useTabs";
import Button from "@/components/Button";

export type ContractSelectorProps = {
    tabId: string | undefined | number;
}

export const ContractSelector: FC<ContractSelectorProps> = (props: ContractSelectorProps) => {
    const { contracts, findContract } = useContractsList({});

    const [show, setShow] = useState(false);

    const dispatch = useAppDispatch();
    const { tabs } = useTabs();

    const tabInfo = useMemo(() => {
        return tabs.filter(tab => tab.id === props.tabId);
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
                <Button onClick={() => {
                    setShow(true);
                }}>Change contract</Button>
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
                        <Typography variant="h6">Contract current</Typography>
                    </Grid>
                    <Grid item xs={4}>

                        <Typography variant="h6">{tabInfo[0].contractAddress}</Typography>
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
                        <Button sx={{ w: '100%' }} onClick={() => {
                        }}>Use contract</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button sx={{ w: '100%' }} onClick={() => {
                            setShow(false);
                        }
                        }>Cancel</Button>
                    </Grid>

                </Grid>

            </Box>




        </>
    )
}