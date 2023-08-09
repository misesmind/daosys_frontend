import React, { FC } from "react";
import { Tab, IconButton, Box, TabProps } from "@mui/material";
import { Close } from "@mui/icons-material";

export type TabWithCloseProps = {
    label: string;
    key: string | number,
    onClickCloseIcon?: () => void;
    props?: TabProps,
    tabId: string;
    canBeClosed?: boolean;
}

export const TabWithClose: FC<TabWithCloseProps> = ({ key, onClickCloseIcon, tabId, canBeClosed = true, ...props }) => {
    return (
        <Tab
            {...props}
            id={tabId}
            key={key}
            label={
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    {props.label}

                    <IconButton component="span"
                        disabled={!canBeClosed}
                        onClick={() => {
                            onClickCloseIcon && onClickCloseIcon();
                        }}
                        size="small"
                        sx={{
                            ml: 1
                        }}
                    >
                        <Close />
                    </IconButton>


                </Box>
            }
        />
    );
}