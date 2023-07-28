import React, { FC } from "react"
import { Table, TableProps, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody } from "@mui/material"


export interface baseTableProps {
    children: React.ReactNode,
    columns: string[];
    mdTableProps?: TableProps;
}

export const BaseTable: FC<baseTableProps> = ({ children, columns, mdTableProps }) => {
    return (
        <TableContainer component={Paper}>
            <Table {...mdTableProps}>
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => <TableCell key={index}>{column}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {children}
                </TableBody>
            </Table>
        </TableContainer>

    )
}

