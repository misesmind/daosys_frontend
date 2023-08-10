import Box from "@/components/Box";
import React, { FC } from "react";
import { TabAdd } from "./TabAdd";
import { ContractSelector } from "../../contracts/components/ContractSelector";

export type TabViewerProps = {
    tabId: string | undefined | number;
}

export const TabViewer: FC<TabViewerProps> = (props: TabViewerProps) => {
    if (undefined === props.tabId || 'new' === props.tabId) return (<>
        <TabAdd />
    </>);

    return (
        <>
            <Box>
                {props.tabId}

                <ContractSelector tabId={props.tabId} />
            </Box>
        </>
    );
}