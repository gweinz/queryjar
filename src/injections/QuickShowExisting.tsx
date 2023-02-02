import React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import AbcOutlinedIcon from '@mui/icons-material/AbcOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Grow, IconButton } from '@mui/material';
import { copyToClipboard, Query } from '../utils/crud';

interface IProps {
    queryToSuggest: Query;
    asCTE: boolean;
    onClose: Function;
}

export default function ({ queryToSuggest, asCTE, onClose }: IProps) {
    const actions = [
        { icon: <IconButton onClick={() => copyToClipboard(queryToSuggest, asCTE)}> <FileCopyIcon /> </IconButton>, name: 'Copy' },
        { icon: <AbcOutlinedIcon />, name: queryToSuggest.name  },
        { icon: <IconButton onClick={() => onClose()}> <ClearIcon /> </IconButton>, name: 'Clear' },
      ];

    return (
        <Grow in={true}>
            <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    // sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<NotificationsIcon fontSize='large'/>}
                    FabProps={{
                        sx: {
                        bgcolor: "#5e17eb",
                        '&:hover': {
                            bgcolor: "#5e17eb",
                        }
                        }
                    }}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                        />
                    ))}
                </SpeedDial>
            </Box>
        </Grow>
    );
}