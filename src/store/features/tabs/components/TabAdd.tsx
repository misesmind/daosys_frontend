import React, { FC } from "react";
import { Box } from "@/components/Box";
import { Typography } from "@mui/material";

export type TabAddProps = {

}

export const TabAdd: FC<TabAddProps> = (props: TabAddProps) => {
    return (
        <>
            <Box>
                <Typography variant="h3">
                    Add new Tab
                </Typography>

                <Typography variant="body1">
                    There&apos;s no tabs yet. Add a new one to get started.
                </Typography>
            </Box>
        </>
    );
}