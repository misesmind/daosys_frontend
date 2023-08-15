import { useAppSelector } from "@/store/hooks";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React, { FC } from "react"

export type TabInfoBlockProps = {
    tabId: string | undefined | number;
}

export const TabInfoBlock: FC<TabInfoBlockProps> = (props: TabInfoBlockProps) => {
    const tab = useAppSelector(
        state => state.tabsSlice.tabs.find(tab => tab.id === props.tabId)
    );

    return (
        <>
            <Accordion>
                <AccordionSummary>
                    <Typography variant="h6">
                        Tab Info - {tab?.title || "Untitled"}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1">
                        {JSON.stringify(tab, null, 2)}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )
}