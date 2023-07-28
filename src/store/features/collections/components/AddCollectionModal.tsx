'use client'

import Box from "@/components/Box";
import { Fade, Modal, Typography } from "@mui/material";
import React, { FC } from "react"

export interface AddCollectionModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddCollectionModal: FC<AddCollectionModalProps> = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Fade in={open}>
                <Box isModal>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Collection
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        form will be here.
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    )
}