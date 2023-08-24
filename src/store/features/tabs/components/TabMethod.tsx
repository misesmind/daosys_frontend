import React, { FC, useCallback, useState, useMemo, useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, TextField, Typography } from "@mui/material";
import { AbiFunction } from "abitype";
import Button from "@/components/Button";
import TabMethodOptions from "./TabMethodOptions";

export type TabMethodProps = {
    details: AbiFunction;
    onCall: (
        params: { [key: string]: string },
        stateSetCallback: React.Dispatch<React.SetStateAction<{ [key: string]: string; }>>,
        setErrorCallback: React.Dispatch<React.SetStateAction<string>>,
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


    const handleCallProxy = useCallback(() => {
        onCall(inputs, setResults, setErrorMessage, options);
    }, [onCall, inputs, options]);

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
        <Accordion>
            <AccordionSummary>
                <Typography variant="h6">
                    {details.name}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
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
                                label={param.name}
                                variant="outlined"
                                onChange={(e) => {
                                    handleInputChange(param.name as string, e.target.value);
                                }}
                            />
                        </Box>
                    );
                })}

                <Grid container>
                    <Grid item xs={10}>
                        <Button neon onClick={handleCallProxy}>
                            Execute
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <TabMethodOptions onUpdate={(options) => {
                            handleOptionsUpdate(options);
                        }} changed={Object.keys(options).length > 0} initialValues={options} />
                    </Grid>
                </Grid>


                {Object.keys(results).length > 0 && (
                    <Box>
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
                    </Box>
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
            </AccordionDetails>
        </Accordion>
    );
};
