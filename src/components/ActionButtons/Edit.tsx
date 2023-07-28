import React, { FC } from "react";
import Button, { ButtonProps } from "../Button";
import { Icon } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

interface EditProps extends ButtonProps {
    onClick: () => void;
    icon?: JSX.Element;

}

export const Edit: FC<EditProps> = ({ onClick, icon, ...props }) => {
    return (
        <Button onClick={onClick} size="small" {...props}>
            <Icon component={EditIcon} sx={{ fontSize: 16, mr: 1 }} /> Edit
        </Button>
    );
}