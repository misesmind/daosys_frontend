import { Close, Settings } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { FC, useState } from 'react'

export type TabSettingsProps = {
    tabId: string | undefined | number;
}

export const TabSettings: FC<TabSettingsProps> = (props: TabSettingsProps) => {

    const [showSettings, setShowSettings] = useState(false);

    if (!showSettings) {
        return (
            <>
                <IconButton sx={{
                    justifyContent: 'flex-end'
                }} onClick={() => setShowSettings(true)}>
                    <Settings />
                </IconButton>
            </>
        )
    }

    return (
        <>
            <IconButton
                sx={{
                    justifyContent: 'flex-end'
                }}
                onClick={() => setShowSettings(false)}>
                <Close />
            </IconButton>
        </>
    )
}
