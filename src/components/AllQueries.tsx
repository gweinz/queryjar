import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { FormControlLabel, FormGroup, IconButton, ListSubheader, Stack, Switch, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
import { Query } from '../utils/crud';

interface IProps {
  directory: Query[] | [];
}

function renderRow(props: ListChildComponentProps) {
  const { index, style, data } = props;
  const item = data[index];
  let displayName: string;
  if (item.name.length > 20) {
      displayName = item.name.substring(0, 20) + "..."
  } else {
      displayName = item.name;
  }
  let displayDesc: string;
  if (item?.desc.length > 200) {
      displayDesc = item.desc.substring(0, 200) + "..."
  } else {
      displayDesc = item.desc;
  }
  return (
      <ListItem 
          style={style} 
          key={index} 
          component="div" 
          disablePadding
          secondaryAction={
            <IconButton edge="end" aria-label="info">
              <Tooltip title={displayDesc}>
                <InfoIcon />
              </Tooltip>
            </IconButton>
    
          }
          sx={{ margin: 1, }}
        >
            <ListItemText primary={displayName} />
        </ListItem>
  );
}

export default function AllQueries({ directory }: IProps) {

  const [showDirectory, setShowDirectory] = useState(false);

  const handleDirectory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowDirectory(event.target.checked);
  };

  return (
    <Box
        sx={{
        minWidth: 340, 
        maxWidth: 340, 
        maxHeight: 230,
        bgcolor: 'background.paper',
        border: '1px solid #F5F5F5',
        boxShadow: 4,
        overflowX: 'hidden',
      }}
    >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <ListSubheader>Directory</ListSubheader>
          <FormGroup>
            <FormControlLabel 
              control={<Switch
                edge="end"
                onChange={handleDirectory}
                checked={showDirectory}
                inputProps={{
                  'aria-labelledby': 'switch-list-label-listen',
                }}
              />} 
              label="" 
              />
          </FormGroup>
        </Stack>
                 
        { showDirectory &&
        
            <FixedSizeList
              height={180}
              width={340}
              itemSize={26}
              itemCount={directory.length}
              itemData={directory}
            >
              {renderRow}
            </FixedSizeList>
        }
    </Box>
  );
}
