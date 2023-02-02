import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {  Stack, Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';



interface IProps {
    handleDelete: () => void;
    handleCopy: () => void;
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    stickToBottom: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      left: 0,
    },
  }),
);

export default function DialogOptions({handleDelete, handleCopy}: IProps) {

    const classes = useStyles();
    
    return (
        <Box 
        mb={1}
        className={classes.stickToBottom}
        >
            <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={2}
            >
                <IconButton color="error" onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>

                <IconButton color="success" onClick={handleCopy}>
                    <ContentCopyIcon />
                </IconButton>

            </Stack>

        </Box>
    );
}