import React, { useState } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Alert, Box, Button, createTheme, Grid,  IconButton,  Stack,  TextField, ThemeProvider, Tooltip, } from '@mui/material';
import { addQueryToLocalJar, loadJar, Query } from '../utils/crud';
import {v4 as uuid} from 'uuid'
import { format } from 'sql-formatter';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface IProps {
    starterBody: string;
    onClose: Function;
}

const theme = createTheme({
    palette: {
      primary: {
        main: "#5e17eb",
      },
    },
    typography: {
      fontFamily: [
        'Roboto Mono',
        'monospace',
      ].join(','), 
    }
  });

export default function ({ starterBody , onClose}: IProps) {

    const [queryName, setQueryName] = useState("");
    const [queryBody, setQueryBody] = useState(starterBody);

    const disableCreate = !Boolean(queryBody.length > 0  && queryName.length > 0);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQueryName(event.target.value);
    };
    
    const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newBody = event.target.value;
        setQueryBody(newBody);
    };

    const handleAddNew = async () => {
        const id: string = uuid();
        const created_at = new Date();
        const updated_at = new Date();
        const newQuery: Query = {
            id,
            name: queryName,
            desc: "",
            body: queryBody,
            creator: "placeholder",
            created_at: created_at.toString(),
            updated_at: updated_at.toString(),
        }
        await addQueryToLocalJar(newQuery);
        onClose();
    }
    
    return (
        <ThemeProvider theme={theme}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{padding: 2}}
                >   
                <Alert icon={false} severity="info">
                    Want to save this to your Jar?
                </Alert>
                <TextField
                    label="Name"
                    size="small"
                    placeholder="Enter a name"
                    maxRows={1}
                    value={queryName}
                    onChange={handleNameChange}
                    style={{ width: 200, marginTop:14, marginBottom: 6 }}
                />

                <TextareaAutosize
                        minRows={4}
                        maxRows={4}
                        placeholder="Enter your query here"
                        style={{ width: 198, marginBottom: 1  }}
                        value={format(queryBody, { language: 'plsql' })}
                        // onChange={handleBodyChange}
                    />
                <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                >
                    <Grid item>
                        <IconButton 
                            color="error"
                            onClick={() => onClose()}
                        >
                            <CancelIcon />
                        </IconButton>
                    </Grid>

                    <Grid item>
                        <IconButton 
                            disabled={disableCreate}
                            color="success"
                            onClick={ async () => {
                                await handleAddNew();
                            }}
                        >
                            <CheckCircleIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>

  );
}