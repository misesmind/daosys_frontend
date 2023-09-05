import React, { FC, useCallback, useState, useMemo, useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, FormControl, FormControlLabel, Grid, Switch, TextField, Typography } from "@mui/material";
import { AbiFunction } from "abitype";
import Button from "@/components/Button";
import TabMethodOptions from "./TabMethodOptions";
import TabMethodEvents from "./TabMethodEvents";
import { ArrowRight, ExpandMore, ExpandOutlined } from "@mui/icons-material";
import { Box as CustomBox } from "@/components/Box";
import { AbiEncoder } from "@/components/AbiEncoder";


export type TabMethodProps = {
    details: AbiFunction;
    onCall: (
        params: { [key: string]: string },
        stateSetCallback: React.Dispatch<React.SetStateAction<{ [key: string]: string; }>>,
        setErrorCallback: React.Dispatch<React.SetStateAction<string>>,
        setTxHash: React.Dispatch<React.SetStateAction<string | undefined>>,
        staticCall: boolean,
        options?: { [key: string]: string | number | bigint },
    ) => void;
};

export const TabMethod: FC<TabMethodProps> = ({ details, onCall }) => {

    // Initialize the inputs state based on the details.inputs
    const initialInputs = useMemo(() => {
        return details.inputs.reduce((acc, param) => {
            acc[param.name as string] = '';
            return acc;
        }, {} as { [key: string]: string });
    }, [details.inputs]);


    const [results, setResults] = useState<{ [key: string]: string }>({});
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [options, setOptions] = useState<{ [key: string]: string | number | bigint }>({});
    const [inputs, setInputs] = useState(initialInputs);

    const [txHash, setTxHash] = useState<string | undefined>(undefined);

    const [staticCall, setStaticCall] = useState<boolean>(false);


    const handleCallProxy = useCallback(() => {
        onCall(inputs, setResults, setErrorMessage, setTxHash, staticCall, options);
    }, [onCall, inputs, staticCall, options]);

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStaticCall(event.target.checked);
    }


    // Updated onChange handler to use a function inside setState
    // to ensure we are working with the latest state
    const handleInputChange = (name: string, value: string) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    const handleOptionsUpdate = (newOptions: { [key: string]: string | number | bigint }) => {
        const repaceOptions = ({
            ...options, ...newOptions
        });

        const filteredOptions = Object.keys(repaceOptions).reduce((acc, key) => {
            if (repaceOptions[key] !== '') {
                acc[key] = repaceOptions[key];
            }
            return acc;
        }, {} as { [key: string]: string | number | bigint });

        setOptions(filteredOptions);
    }


    return (
        <Accordion

        >
            <AccordionSummary
                expandIcon={<ExpandMore />}
            >
                <Grid container>
                    <Grid item xs={10}>
                        <Box component={'span'} sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <ArrowRight sx={{
                                mr: 2,
                            }} />
                            <Typography variant="h6">
                                {details.name}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                <CustomBox>
                    <Box>
                        <Typography textAlign={'center'} variant="h6">
                            Call method
                        </Typography>
                    </Box>

                    <Divider />

                    {details.inputs.length > 0 && details.inputs.map((param, index) => {
                        return (
                            <Box component="div" key={index} sx={{
                                mb: 2,
                            }}>
                                <Typography variant="body1" sx={{
                                    mb: 2,
                                    fontWeight: 'bold',
                                }}>
                                    {param.name} ({param.type})
                                </Typography>
                                <TextField
                                    key={index}

                                    variant="outlined"
                                    value={inputs[param.name as string]}
                                    onChange={(e) => {
                                        handleInputChange(param.name as string, e.target.value);
                                    }}
                                />
                                <AbiEncoder onResultCallback={(result) => {
                                    console.log(result);
                                    handleInputChange(param.name as string, result);
                                }}
                                    onOpen={() => {
                                        console.log('open');
                                    }}
                                    onClose={() => {
                                        console.log('close');
                                    }}
                                />

                            </Box>
                        );
                    })}

                    <Grid container sx={{
                        mt: 3
                    }}>
                        <Grid item xs={8}>
                            <Button neon onClick={handleCallProxy}>
                                Execute
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControlLabel
                                control={
                                    <Switch onChange={handleSwitchChange}
                                        checked={staticCall}
                                    />
                                }

                                label="Static"
                            />

                        </Grid>
                        <Grid item xs={2} sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}>
                            <TabMethodOptions onUpdate={(options) => {
                                handleOptionsUpdate(options);
                            }} changed={Object.keys(options).length > 0} initialValues={options} />
                        </Grid>
                    </Grid>

                </CustomBox>


                {Object.keys(results).length > 0 && (
                    <CustomBox
                        sx={{
                            mt: 2,
                        }}
                    >
                        <Typography variant="h6">
                            Results
                        </Typography>
                        {Object.keys(results).map((key, index) => {
                            return (
                                <Typography key={index} variant="body1">
                                    {key}: {results[key]}
                                </Typography>
                            );
                        })}
                    </CustomBox>
                )}

                {errorMessage && (
                    <Box sx={{
                        mt: 2,
                        mb: 2,
                        backgroundColor: (theme) => theme.palette.error.main,
                        padding: 2,
                        color: (theme) => theme.palette.error.contrastText,
                    }}>
                        <Typography variant="h6">
                            Error
                        </Typography>
                        <Typography variant="body1">
                            {errorMessage}
                        </Typography>
                    </Box>
                )}

                {txHash && <TabMethodEvents txHash={txHash} />}
            </AccordionDetails>
        </Accordion>
    );
};
