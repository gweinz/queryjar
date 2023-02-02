import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Query, updateQuery } from '../utils/crud';
import { Box, Button, FormControlLabel, Typography, Stack, Switch, TextareaAutosize } from '@mui/material';
import React,  { useState }  from 'react';
import { SuccessAlert } from './Banners';
import { format } from 'sql-formatter';

interface IProps {
    activeQuery: Query | null;
    closeModal: () => void;
}

const itemStyle = {
    width: 280,
}

export default function QueryDetails({ activeQuery, closeModal }: IProps) {
    const [query, setQuery] = useState<Query | null>(activeQuery);
    const [expanded, setExpanded] = useState<string | false>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [showUpdatedBanner, setShowUpdatedBanner] = useState<boolean>(false);
    const [updatedBody, setUpdatedBody] = useState<string>(query?.body ?? "");
    const [updatedName, setUpdatedName] = useState<string>(query?.name ?? "");
    const [updatedDesc, setUpdatedDesc] = useState<string>(query?.desc ?? "");    

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditMode(event.target.checked);
        // Any time toggle is interacted with need to update the state back to basic
        setUpdatedBody(query?.body ?? "");
        setUpdatedDesc(query?.desc ?? "");
        setUpdatedName(query?.name ?? "");
    };

    const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (editMode) {
            const newBody = format(event.target.value, { language: 'plsql' })
            setUpdatedBody(newBody);
        }
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (editMode) {
            setUpdatedName(event.target.value);
        }
    };

    const handleDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (editMode) {
            setUpdatedDesc(event.target.value);
        }
    };

    const handleUpdateQuery = async () => {
        if (!query) return;
        await updateQuery(query, updatedName, updatedDesc, updatedBody);
        setQuery({...query, name: updatedName, desc: updatedDesc, body: updatedBody});
        setShowUpdatedBanner(true);
        setTimeout(() => {
            setShowUpdatedBanner(false);
        }, 2000)
        closeModal();
    }
    

    const editButton = () => {
        return (
            <FormControlLabel
                sx={{ position: "fixed", top: 0, right: 10, zIndex: 2000 }}
                control={
                    <Switch 
                    color="primary"
                    onChange={handleEdit}
                    checked={editMode}
                    />}
                label="Edit Mode"
                labelPlacement="start"
            />
        );
    }
    
    if (!query) return <> </>;
    
    return (
        <Box mt={3} sx={itemStyle}>
            {editButton()}
            <Accordion 
                expanded={expanded === 'name'} 
                onChange={handleChange('name')}
                sx={itemStyle}
            >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="namebh-content"
                id="namebh-header"
                >
                <Typography>
                    Name
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack direction="column"  spacing={0.2} alignItems="center">
                        <TextareaAutosize
                            maxRows={8}
                            value={updatedName}
                            onChange={handleNameChange}
                        />
                    </Stack>
                </AccordionDetails>
            </Accordion>
            <Accordion 
                expanded={expanded === 'desc'} 
                onChange={handleChange('desc')}
                sx={itemStyle}
            >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="descbh-content"
                id="descbh-header"
                >
                <Typography>
                    Description
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack direction="column"  spacing={0.2} alignItems="center">
                        <TextareaAutosize
                            maxRows={8}
                            style={{ width: 220 }}
                            value={updatedDesc}
                            onChange={handleDescChange}
                        />
                    </Stack>
                </AccordionDetails>
            </Accordion>
            
            <Accordion 
                expanded={expanded === 'body'} 
                onChange={handleChange('body')}
                sx={itemStyle}
            >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="bodybh-content"
                id="bodybh-header"
                >
                <Typography>
                    SQL
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack direction="column"  spacing={0.2} alignItems="center">
                        <TextareaAutosize
                            maxRows={8}
                            style={{ width: 220 }}
                            value={updatedBody}
                            onChange={handleBodyChange}
                        />
                    </Stack>
                </AccordionDetails>
            </Accordion>

            {editMode &&
                <Stack sx={{mt:2}} direction="row" alignItems="center" justifyContent="center">
                    <Button 
                        size="small" 
                        variant="contained"
                        onClick={ async () => {
                            await handleUpdateQuery();
                        }}
                    > 
                        Save Edits 
                    </Button>
                </Stack>
            }

            {showUpdatedBanner &&
                <SuccessAlert blurb={"Query has been updated."} width={280} />
            }
        </Box>
    );
}
