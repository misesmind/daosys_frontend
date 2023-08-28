import { useAppSelector } from "@/store/hooks";
import { Accordion, AccordionDetails, AccordionSummary, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import React, { FC, useMemo } from "react"
import { useFindContract } from "../../contracts/hooks/useFindContract";

export type TabInfoBlockProps = {
    tabId: string | undefined | number;
}

export const TabInfoBlock: FC<TabInfoBlockProps> = (props: TabInfoBlockProps) => {
    const tab = useAppSelector(
        state => state.tabsSlice.tabs.find(tab => tab.id === props.tabId)
    );

    const contract = useFindContract(tab?.contractAddress);

    return (
        <>
            <Accordion>
                <AccordionSummary>
                    <Typography variant="h6">
                        Tab Info - {tab?.title || "Untitled"}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="body2">Tab ID</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">{tab?.id}</Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    <Typography variant="body2">Tab Name</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">{tab?.title}</Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    <Typography variant="body2">Contract Address</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">{tab?.contractAddress || '-'}</Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    <Typography variant="body2">Contract Name</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">{contract?.[1].name || '-'}</Typography>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </AccordionDetails>
            </Accordion>
        </>
    )
}