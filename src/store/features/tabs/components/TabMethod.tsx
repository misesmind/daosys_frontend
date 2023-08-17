import { Accordion, AccordionDetails, AccordionSummary, Box, TextField, Typography } from "@mui/material";
import React, { FC } from "react"
import { AbiFunction } from "abitype"

export type TabMethodProps = {
    details: AbiFunction;
    onCall: (props: { [key: string]: string }) => void;
}

export const TabMethod: FC<TabMethodProps> = ({ details, onCall }) => {

    return (
        <Accordion>
            <AccordionSummary>
                <Typography variant="h6">
                    {details.name}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {details.inputs.length > 0 && details.inputs.map((param, index) => {
                    return (<Box component="div" key={index}>

                        <Typography variant="body1">
                            {param.name} ({param.type})
                        </Typography>

                        <TextField
                            key={index}
                            label={param.name}
                            variant="outlined"
                        />

                    </Box>)
                })}
            </AccordionDetails>
        </Accordion>
    );
}