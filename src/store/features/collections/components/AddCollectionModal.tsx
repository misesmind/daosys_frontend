'use client'

import Box from "@/components/Box";
import Button from "@/components/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    Fade,
    FormControl,
    Modal,
    TextField,
    Typography
} from "@mui/material";
import React, { FC, useState, useEffect, use, useCallback } from "react"

export interface AddCollectionModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddCollectionModal: FC<AddCollectionModalProps> = ({ open, onClose }) => {
    const [collectionName, setCollectionName] = useState<string>("")
    const [error, setError] = useState<string>('')

    const collections = useAppSelector(state => state.collectionsSlice.items);
    const dispatch = useAppDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCollectionName(event.target.value);
    };

    const handleAddCollection = () => {
        dispatch({
            type: 'collections/addCollection', payload: {
                name: collectionName,
                collection: []
            }
        })

        setCollectionName('')
        setError('')
    }

    const checkIfExists = useCallback((name: string) => {
        return Object.keys(collections).includes(name);
    }, [collections]);

    useEffect(() => {
        if (collectionName === '') return;

        const exists = checkIfExists(collectionName)

        if (exists) {
            setError('Collection already exists')
        } else {
            setError('')
        }
    }, [checkIfExists, collectionName]);

    useEffect(() => {
        setError('')
        setCollectionName('')
    }, [open]);


    return (
        <Modal sx={{ mt: 10 }} open={open} onClose={onClose}>
            <Fade in={open}>
                <Box isModal>
                    <Box mb={3}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add Collection
                        </Typography>
                    </Box>
                    <Box
                    >
                        <FormControl fullWidth>
                            <TextField
                                id="collection-name"
                                label="Collection Name"
                                variant="outlined"
                                helperText={error ?? 'Enter a name for your collection'}
                                onChange={handleChange}
                                value={collectionName}
                                error={error !== ''}
                            />
                        </FormControl>

                        <Button sx={{ mt: 3 }}
                            disabled={error !== ''}
                            onClick={handleAddCollection}
                            variant="contained" color="primary" fullWidth>
                            Add Collection
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}