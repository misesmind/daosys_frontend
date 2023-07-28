import React, { FC } from "react";
import { useAppSelector } from "@/store/hooks";
import { Box } from "@/components/Box";
import { Grid, TableCell, TableRow, Typography } from "@mui/material";
import { BaseTable } from "@/components/DataPresenter";
import { Edit, Switch } from "@/components/ActionButtons";
import useSelectedCollection from "../../userPreferences/hooks/useSelectedCollection";

export const CollectionList: FC = () => {
    const collections = useAppSelector(state => state.collectionsSlice.items);

    const {
        changeCollection
    } = useSelectedCollection();

    return (
        <BaseTable
            mdTableProps={{
                sx: {
                    mt: 2
                }
            }}
            columns={[
                "Name",
                "Actions"
            ]}
        >
            {Object.keys(collections).length > 0 && (
                Object.keys(collections).map((collectionName, index) => (
                    <TableRow key={index}>
                        <TableCell width={'70%'}>
                            {collectionName}
                        </TableCell>
                        <TableCell>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Switch onClick={() => {
                                        changeCollection(collectionName)
                                    }} />
                                </Grid>
                            </Grid>
                        </TableCell>
                    </TableRow>
                )))}

            {Object.keys(collections).length === 0 && (
                <TableRow>
                    <TableCell colSpan={2}>
                        <Typography variant='body1'>
                            No collections yet
                        </Typography>
                    </TableCell>
                </TableRow>
            )}

        </BaseTable>
    );
}