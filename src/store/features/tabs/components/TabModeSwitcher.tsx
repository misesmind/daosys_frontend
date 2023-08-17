import React, { FC } from "react";
import { useAppSelector } from "@/store/hooks";
import { Button, ButtonGroup } from "@mui/material";
import { TabSwitcherMode } from "../types";

export type TabModeSwitcherProps = {
    tabId: string | undefined | number;
    isProxy: boolean;
    currentMode: TabSwitcherMode;
    onChangeMode: (mode: TabSwitcherMode) => void;
}

export const TabModeSwitcher: FC<TabModeSwitcherProps> = (props: TabModeSwitcherProps) => {
    const { isProxy, onChangeMode, currentMode } = props;

    return (
        <ButtonGroup variant="contained" color="primary">
            <Button variant={currentMode === 'read' ? 'contained' : 'outlined'} onClick={() => onChangeMode("read")}>Read</Button>
            <Button variant={currentMode === 'write' ? 'contained' : 'outlined'} onClick={() => onChangeMode("write")}>Write</Button>
            {isProxy && (
                <>
                    <Button variant={currentMode === 'read_as_proxy' ? 'contained' : 'outlined'} onClick={() => onChangeMode("read_as_proxy")}>Read as Proxy</Button>
                    <Button variant={currentMode === 'write_as_proxy' ? 'contained' : 'outlined'} onClick={() => onChangeMode("write_as_proxy")}>Write as Proxy</Button>
                </>
            )}
        </ButtonGroup>
    );
}
