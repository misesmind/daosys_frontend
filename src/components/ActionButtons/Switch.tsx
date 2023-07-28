import React, { FC } from "react";
import Button, { ButtonProps } from "../Button";
import { Icon } from "@mui/material";
import { SwapHoriz } from "@mui/icons-material";

interface SwitchProps extends ButtonProps {
    onClick: () => void;
    icon?: JSX.Element;

}

export const Switch: FC<SwitchProps> = ({ onClick, icon, ...props }) => {
    return (
        <Button variant="outlined" size="small" onClick={onClick} {...props}>
            <Icon component={SwapHoriz} sx={{ fontSize: 16, mr: 1 }} /> Switch
        </Button>
    );
}