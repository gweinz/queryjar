import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {  ListItemButton, Modal } from '@mui/material';
import { copyToClipboard, Query, removeFromLocalJar } from '../utils/crud';
import { useState } from 'react';
import { NoQueriesAlert, QueryDeletedAlert } from './Banners';
import CheckIcon from '@mui/icons-material/Check';
import QueryModal from './QueryModal';


interface IProps {
    queries: Query[] | [];
    handleRefresh: () => void;
    copyAsCTE: boolean;
}

const Base = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

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

export default function ResultList({ queries, handleRefresh, copyAsCTE }: IProps) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState<Query | null>(null);
    const [copied, setCopied] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [showCheckButton, setShowCheckButton] = useState<string>('');

    const handleOpen = (q: Query) => {
        setOpen(true);
        setQuery(q)
    }

    const handleClose = () => setOpen(false);

    const handleDelete = async () => {
        if (!query) return;
        await removeFromLocalJar(query);
        handleRefresh();
        handleClose();
        setDeleted(true);
        setTimeout(() => {
            setDeleted(false);
        }, 2000)
    }

    const copyButton = (query: Query) => {
        if (query.id === showCheckButton) {
            return (
                <IconButton edge="end">
                    <CheckIcon color="success" />
                </IconButton>
            );
        } else {
            return ( <IconButton edge="end" onClick={() => {
                copyToClipboard(query, copyAsCTE)
                setShowCheckButton(query.id);
                setTimeout(() => {
                    setShowCheckButton('');
                }, 2000)
            }}>
                <ContentCopyIcon />
            </IconButton> );
        }
    }

    const queryItem = (query: Query, handleOpen: () => void) => {
        let displayName: string;
        if (query.name.length > 20) {
            displayName = query.name.substring(0, 20) + "..."
        } else {
            displayName = query.name;
        }
        return (
            <ListItem 
                key={query.name}
                secondaryAction={copyButton(query)}
                >
                <ListItemButton onClick={handleOpen}>
                    <ListItemText primary={displayName} />
                </ListItemButton>
            </ListItem>
            
        );
    }

    return (
        <Box 
            mt={2}
            sx={{ 
                flexGrow: 1,
                bgcolor: 'background.paper',
                border: '1px solid #F5F5F5',
                boxShadow: 4,
            }}
        >
            <Modal
                open={open}
                onClose={handleClose}
            >   
                <QueryModal 
                    query={query} 
                    handleClose={handleClose} 
                    handleRefresh={handleRefresh}
                    handleDelete={handleDelete}
                    copyAsCTE={copyAsCTE}
                />
            </Modal>

            <Base>
                {   
                    queries.length === 0 ? <NoQueriesAlert />
                        :
                    <List sx={{ width: 300 }} dense>
                        { 
                            queries.map((query) => {
                                return ( 
                                    queryItem(query, () => handleOpen(query))
                                );
                            })
                        }
                    </List>
                }
            </Base>
            {deleted && 
                <QueryDeletedAlert />
            }
        </Box>
    );
}