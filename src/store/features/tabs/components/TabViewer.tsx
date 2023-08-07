import Box from "@/components/Box";
import React, { FC } from "react";
import { TabAdd } from "./TabAdd";

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
            </Box>
        </>
    );
}