import React, { FC } from "react";
import { v4 } from "uuid"

export type TabAddProps = {

}

export const TabAdd: FC<TabAddProps> = (props: TabAddProps) => {
    return (
        <>
            Add new tab. {v4()}
        </>
    );
}