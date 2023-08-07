import React, { FC } from "react";
import { Tab, IconButton, Box, TabProps } from "@mui/material";
import { Close } from "@mui/icons-material";

export type TabWithCloseProps = {
    label: string;
    key: string | number,
    onClickCloseIcon?: () => void;
    props?: TabProps,
    tabId: string;
}

export const TabWithClose: FC<TabWithCloseProps> = ({ key, onClickCloseIcon, tabId, ...props }) => {
    return (
        <Tab
            {...props}
            id={tabId}
            key={key}
            label={props.label}

        />
    );
}