import React, { useState } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Button, Grid,  TextField, } from '@mui/material';
import { addQueryToLocalJar, loadJar, Query } from '../utils/crud';
import { SuccessAlert } from './Banners';
import {v4 as uuid} from 'uuid'

export default function CreateRecipe() {

    const [queryName, setQueryName] = useState("");
    const [queryDesc, setQueryDesc] = useState("");
    const [queryBody, setQueryBody] = useState("");
    const [isSavingQuery, setIsSavingQuery] = useState(false)
    const [showSaved, setShowSaved] = useState(false)

    const disableCreate = !Boolean(queryBody.length > 0  && queryName.length > 0);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQueryName(event.target.value);
    };

    const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQueryDesc(event.target.value);
    };
    
    const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQueryBody(event.target.value);
    };

    const clearAll = () => {
        setQueryName("");
        setQueryDesc("");
        setQueryBody("");
    }

    const handleShowSuccess = () => {
        setShowSaved(true);
        setTimeout(() => {
            setShowSaved(false);
        }, 6000)
    }

    // add formatting
    // const body = format(request.body, { language: 'plsql' })
    // request = {...request, body}

    const handleAddNew = async () => {
        const id: string = uuid();
        const created_at = new Date();
        const updated_at = new Date();
        const newQuery: Query = {
            id,
            name: queryName,
            desc: queryDesc,
            body: queryBody,
            creator: "placeholder",
            created_at: created_at.toString(),
            updated_at: updated_at.toString(),
        }
        await addQueryToLocalJar(newQuery);
        clearAll();
        handleShowSuccess();
    }
    
    return (

        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        >   
            
            <Grid item>
                <TextField
                    fullWidth
                    label="Name"
                    placeholder="Enter a name"
                    size="small"
                    maxRows={2}
                    multiline
                    value={queryName}
                    onChange={handleNameChange}
                    style={{ width: 298 }}
                />
            </Grid>

            <Grid item>
                <TextField
                    fullWidth
                    label="Description"
                    placeholder="Write a quick blurb to remember what this query does"
                    size="small"
                    maxRows={4}
                    multiline
                    value={queryDesc}
                    onChange={handleDescChange}
                    style={{ width: 300 }}
                />
            </Grid>

            <Grid item>
                    <TextareaAutosize
                        minRows={4}
                        maxRows={10}
                        placeholder="Enter your query here"
                        style={{ width: 300 }}
                        value={queryBody}
                        onChange={handleBodyChange}
                    />
            </Grid> 
            

            <Grid item>
                <Button 
                    disabled={disableCreate}
                    variant="contained" 
                    size="small"
                    onClick={ async () => {
                        await handleAddNew();
                    }}
                >
                    Add to Jar
                </Button>
            </Grid>

            {showSaved && 
                <Grid item>
                    <SuccessAlert blurb={"Updates have been saved"} width={300}/>
                </Grid>
            }
        </Grid>
  );
}