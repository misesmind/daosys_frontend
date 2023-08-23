import Button from "@/components/Button";
import { AlignVerticalBottom, InfoOutlined } from "@mui/icons-material";
import { Box, Modal, TextField, Typography } from "@mui/material";
import React, { FC, useState } from "react"

export type TabMethodOptionsProps = {
    onUpdate: (options: { [key: string]: string | number | bigint }) => void;
    changed: boolean;
    initialValues: { [key: string]: string | number | bigint };
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

export const TabMethodOptions: FC<TabMethodOptionsProps> = ({ onUpdate, changed, initialValues }) => {
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);

    const handleOpen = () => setShow(true);

    if (!show) {
        return (<Button neon onClick={handleOpen}>
            Options {changed ? <InfoOutlined sx={{ color: 'red', fontSize: 'sm' }} /> : ''}
        </Button>);
    }

    console.log(initialValues);


    return (
        <Modal
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-tx-options-title"
            aria-describedby="modal-tx-options-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Customize Transaction Options
                </Typography>
                <Box>
                    <TextField
                        id="gasPrice"
                        label="Gas Price"
                        type="number"
                        placeholder="21000"
                        defaultValue={initialValues.gasPrice || ''}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        sx={{ width: '100%', mb: 2, mt: 2 }}
                        onChange={(e) => onUpdate({ gasPrice: e.target.value })}
                    />

                    <TextField
                        id="maxFeePerGas"
                        label="Max Fee Per Gas"
                        type="number"
                        placeholder="1.5"
                        defaultValue={initialValues.maxFeePerGas || ''}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        sx={{ width: '100%', mb: 2 }}
                        onChange={(e) => onUpdate({ maxFeePerGas: e.target.value })}
                    />

                    <TextField
                        id="maxPriorityFeePerGas"
                        label="Max Priority Fee Per Gas"
                        type="number"
                        placeholder="1.5"
                        defaultValue={initialValues.maxPriorityFeePerGas || ''}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        sx={{ width: '100%', mb: 2 }}
                        onChange={(e) => onUpdate({ maxPriorityFeePerGas: e.target.value })}
                    />

                    <TextField
                        id="nonce"
                        label="Nonce"
                        type="number"
                        placeholder="0"
                        defaultValue={initialValues.nonce || ''}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"

                        sx={{ width: '100%', mb: 2 }}
                        onChange={(e) => onUpdate({ nonce: e.target.value })}
                    />

                    <TextField
                        id="value"
                        label="Value"
                        type="number"
                        placeholder="0"
                        defaultValue={initialValues.value || ''}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        sx={{ width: '100%', mb: 2 }}
                        onChange={(e) => onUpdate({ value: e.target.value })}
                    />

                    <Button onClick={handleClose} sx={{ width: '100%' }}>Save & Close</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default TabMethodOptions;