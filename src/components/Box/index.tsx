'use client'

import { styled, Box as MdBox, BoxProps as MdBoxProps } from "@mui/material";

export interface BoxProps extends MdBoxProps {
    isModal?: boolean;
}

const _modalStyles = {
    position: 'absolute' as 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    border: '1px solid #000',
    borderRadius: 10,
    boxShadow: 24,
    p: 9,
    backgroundColor: '#fefefe',
};

export const Box = styled(MdBox)<BoxProps>(({ theme, isModal }) => ({
    border: '1px solid rgba(0, 0, 0, 0.2)',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
    padding: theme.spacing(2),
    ...(isModal && _modalStyles as any)
}));

export default Box;