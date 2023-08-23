import Button from "@/components/Button";
import { AlignVerticalBottom, InfoOutlined } from "@mui/icons-material";
import { Box, Modal, Typography } from "@mui/material";
import React, { FC, useState } from "react"

export type TabMethodOptionsProps = {
    onUpdate: (options: { [key: string]: string | number | bigint }) => void;
    changed: boolean;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const TabMethodOptions: FC<TabMethodOptionsProps> = ({ onUpdate, changed }) => {
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);

    const handleOpen = () => setShow(true);

    if (!show) {
        return (<Button neon onClick={handleOpen}>
            Options {changed ? <InfoOutlined sx={{ color: 'red', fontSize: 'sm' }} /> : ''}
        </Button>);
    }


    return (
        <Modal
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-tx-options-title"
            aria-describedby="modal-tx-options-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Tx Options
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>
        </Modal>
    )
}

export default TabMethodOptions;