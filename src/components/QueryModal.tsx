import { Box, Grid, IconButton } from "@mui/material";
import React, { useState } from "react";
import { SuccessAlert } from "./Banners";
import DialogOptions from "./DialogOptions";
import QueryDetails from "./QueryDetails";
import ClearIcon from '@mui/icons-material/Clear';
import { copyToClipboard, Query } from "../utils/crud";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    minHeight: 420,
    bgcolor: 'background.paper',
    border: '1px solid #F5F5F5',
    boxShadow: 10,
    p: 3,
};

interface IProps {
    query: Query | null;
    handleClose: () => void;
    handleRefresh: () => void;
    handleDelete: () => void;
    copyAsCTE: boolean;

}

export default function QueryModal(props: IProps) {
    const {query, handleClose, handleRefresh, handleDelete, copyAsCTE } = props;
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!query) return;
        copyToClipboard(query, copyAsCTE);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000)
    }
    if (!query) {
        return <div></div>;
    }
    return (
        <Box sx={style}>
            <IconButton sx={{ position: "fixed", top: 0, left: 0, zIndex: 2000 }} onClick={handleClose}>
                <ClearIcon />
            </IconButton>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <QueryDetails activeQuery={query} closeModal={handleRefresh} />

                {copied && 
                    <Grid item>
                        <SuccessAlert blurb={"Query copied to clipboard."} width={280}/>
                    </Grid>
                }
                <DialogOptions handleDelete={handleDelete} handleCopy={handleCopy} />            
            </Grid>
        </Box>
    );
}