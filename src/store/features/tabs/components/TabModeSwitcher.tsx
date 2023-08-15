import React, { FC } from "react";
import { useAppSelector } from "@/store/hooks";
import { Button, ButtonGroup } from "@mui/material";

export type TabSwitcherMode = "read" | "write" | "read_as_proxy" | "write_as_proxy";

export type TabModeSwitcherProps = {
    tabId: string | undefined | number;
    isProxy: boolean;
    currentMode: TabSwitcherMode;
    onChangeMode: (mode: TabSwitcherMode) => void;
}

export const TabModeSwitcher: FC<TabModeSwitcherProps> = (props: TabModeSwitcherProps) => {
    const { isProxy, onChangeMode } = props;

    return (
        <ButtonGroup variant="contained" color="primary">
            <Button onClick={() => onChangeMode("read")}>Read</Button>
            <Button onClick={() => onChangeMode("write")}>Write</Button>
            {isProxy && (
                <>
                    <Button onClick={() => onChangeMode("read_as_proxy")}>Read as Proxy</Button>
                    <Button onClick={() => onChangeMode("write_as_proxy")}>Write as Proxy</Button>
                </>
            )}
        </ButtonGroup>
    );
}
