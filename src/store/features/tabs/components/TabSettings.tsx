import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Close, Settings } from '@mui/icons-material';
import { IconButton, Input, Popover, TextField, Typography } from '@mui/material';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { setTabTitle as reduxSetTabTitle } from '../tabsSlice';
import throttle from "lodash.throttle"

export type TabSettingsProps = {
    tabId: string | undefined | number;

}

export const TabSettings: FC<TabSettingsProps> = (props: TabSettingsProps) => {

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        // props.setParentGrid(12);
    };

    const handleClose = () => {
        setAnchorEl(null);
        // props.setParentGrid(8);
    };

    const dispatch = useAppDispatch();

    const refInput = useRef<HTMLInputElement>(null);

    const tabTitle = useAppSelector(
        state => state.tabsSlice.tabs.find(tab => tab.id === props.tabId)?.title
    );

    useEffect(() => {
        if (!tabTitle) return;
        if (!refInput.current) return;

        refInput.current.value = tabTitle;

    }, [tabTitle]);

    const throttledSetTabTitle = useMemo(
        () => throttle((name: string) => {
            dispatch(
                reduxSetTabTitle({
                    id: props.tabId,
                    title: name
                })
            );
        }, 100),
        [dispatch, props.tabId]
    );

    const setTabTitle = useCallback(throttledSetTabTitle, [throttledSetTabTitle]);


    const open = Boolean(anchorEl);
    const id = open ? 'tab-settings-popover' : undefined;

    return (
        <>
            <IconButton
                sx={{
                    justifyContent: 'flex-end'
                }}
                onClick={handleClick}>
                {open ? <Close /> : <Settings />}
            </IconButton>
            <Popover

                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}

                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>Tab settings.</Typography>

                <TextField type='text' label="Change Tab Name" placeholder="Tab name" value={tabTitle || ''}
                    onChange={(e) => {
                        console.log(e.target.value)
                        setTabTitle(e.target.value);
                    }}
                />

            </Popover>
        </>
    )
}
