'use client'

import { Button as MdButton, ButtonProps as MdButtonProps, keyframes, styled, css } from "@mui/material";
import pulse from "../Animations/pulse";

export interface ButtonProps extends MdButtonProps {
    neon?: boolean;
}

const Button = styled(MdButton, { shouldForwardProp: (prop) => prop !== 'neon' })<ButtonProps>(
    ({ theme, neon }) => ({
        backgroundColor: neon ? '#000099' : '#000033',
        boxShadow: '2px 2px 2px 2px black',
        zIndex: theme.zIndex.drawer + 1,
        color: neon ? '#00FF00' : '#FFFFFF',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        textAlign: 'center',
        // Apply the pulsating animation to the neon button
        animation: neon ? `${pulse} 2s infinite` : undefined,
        '&:hover': {
            backgroundColor: neon ? '#0000FF' : '#000066'
        },
    }),
);

export default Button;