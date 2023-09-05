import { Modal, Box, Typography, Button, TextField, Select, MenuItem } from "@mui/material";
import { AbiType } from "abitype";
import { parse } from "path";
import React, { FC, useState } from "react"
import { encodeAbiParameters, encodePacked, parseAbiParameters } from "viem";

export type AbiEncoderProps = {
    onResultCallback: (result: string) => void;
    onOpen: () => void;
    onClose: () => void;
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

export const AbiEncoder: FC<AbiEncoderProps> = ({ onResultCallback }) => {
    const [show, setShow] = useState<boolean>(false);

    const [result, setResult] = useState<string>('');

    const [inputs, setInputs] = useState<
        { type: AbiType, value: string }[]
    >([{
        type: 'string',
        value: ''
    }]);

    if (!show) {
        return (<>
            <Button variant="contained" size={'small'} color="info" onClick={() => setShow(true)}
                sx={{
                    ml: 1,
                    mt: 1
                }}
            >
                ABI Encoder
            </Button>
        </>);
    }

    return (<>
        <Modal open={show} onClose={() => setShow(false)}>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    ABI encoder helper
                </Typography>
                <Box>
                    <Button variant="contained" size={'small'} color="info"
                        onClick={() => {
                            setInputs([...inputs, {
                                type: 'string',
                                value: ''
                            }]);
                        }} sx={{
                            mb: 2,
                            mt: 2
                        }}>
                        Add input
                    </Button>


                    {inputs.map((input, index) => {
                        return (
                            <Box key={index} sx={{
                                mb: 2,
                            }}>
                                <Select value={input.type} onChange={(e) => {
                                    const newInputs = [...inputs];
                                    newInputs[index].type = e.target.value as AbiType;
                                    setInputs(newInputs);
                                }}
                                    sx={{
                                        mb: 2,
                                        mr: 2,
                                    }}
                                >
                                    <MenuItem value={'string'}>string</MenuItem>
                                    <MenuItem value={'uint256'}>uint256</MenuItem>
                                    <MenuItem value={'address'}>address</MenuItem>
                                    <MenuItem value={'bool'}>bool</MenuItem>
                                    <MenuItem value={'bytes'}>bytes</MenuItem>

                                </Select>
                                <TextField
                                    key={index}
                                    label={input.type}
                                    variant="outlined"
                                    onChange={(e) => {
                                        const newInputs = [...inputs];
                                        newInputs[index].value = e.target.value;
                                        setInputs(newInputs);
                                    }}
                                />
                                <Button variant="contained" size={'small'} color="info"
                                    onClick={() => {
                                        const newInputs = [...inputs];
                                        newInputs.splice(index, 1);
                                        setInputs(newInputs);
                                    }} sx={{
                                        ml: 2,
                                    }}>
                                    Remove
                                </Button>
                            </Box>
                        );
                    })}

                    <Button variant="contained" size={'small'} color="info"

                        onClick={() => {
                            setResult('');
                            const result =
                                encodeAbiParameters(
                                    parseAbiParameters(
                                        inputs.map((value, index) => {
                                            return `${value.type} input${index}`
                                        }).join(',')
                                    ),
                                    inputs.map((input) => input.value)
                                )


                            setResult(result)
                            onResultCallback(result);
                        }} sx={{
                            mt: 2
                        }}>
                        Encode
                    </Button>

                    {result !== '' && <Box sx={{
                        mt: 2,
                        wordBreak: 'break-all',
                        backgroundColor: (theme) => theme.palette.grey[200],
                        borderRadius: 1,
                    }}>
                        <Typography variant="body1">
                            {result}
                        </Typography>
                    </Box>
                    }
                </Box>
            </Box>
        </Modal>
    </>);
}