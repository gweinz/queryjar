import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import HearingIcon from '@mui/icons-material/Hearing';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { ESettings, loadSettings, updateSettings } from '../utils/crud';
import React, { useCallback, useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import SkeletonAnimation from './LoadingAnimations';


export default function Settings() {

  const [checked, setChecked] = useState(['']);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  const handleUpdate = async (value: string) => {

    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
        newChecked.push(value);
    } else {
        newChecked.splice(currentIndex, 1);
    }
    await updateSettings(newChecked);
    setChecked(newChecked);

  };

  const fetchSettings = useCallback(async () => {
      const settings = await loadSettings();
      if (settings) {
        setChecked(settings);
      }
  }, []);

  useEffect(() => {
    setLoadingData(true);
    fetchSettings();
    setLoadingData(false);
    // setTimeout(() => {
    //   setLoadingData(false);
    // }, 200)    
  }, [fetchSettings]);

  if (loadingData) {
    return (
      <SkeletonAnimation width={300} num={5}/>
      );
  } else {
    return (
      <List
          sx={{ width: '100%', 
          minWidth: 340, 
          maxWidth: 340, 
          bgcolor: 'background.paper',
          border: '1px solid #F5F5F5',
          boxShadow: 4, }}
        subheader={<ListSubheader>Settings</ListSubheader>}
      >
        <ListItem alignItems='center'>
          <ListItemIcon>
            <Tooltip title={"Automatically wrap queries in CTEs when copying via UI."}>
              <ContentPasteGoIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText id="switch-list-label-cte" primary="CTE" />
          <Switch
            edge="end"
            onChange={() => handleUpdate(ESettings.CTE)}
            checked={checked.indexOf(ESettings.CTE) !== -1}
            inputProps={{
              'aria-labelledby': 'switch-list-label-cte',
            }}
          />
        </ListItem>
        <ListItem alignItems='center'>
          <ListItemIcon>
            <Tooltip title={"Enable automatic query detection to find similar queries while you are typing."}>
              <HearingIcon />
            </Tooltip >
          </ListItemIcon>
          <ListItemText id="switch-list-label-listen" primary="Automatic Detection" />
          <Switch
            edge="end"
            onChange={() => handleUpdate(ESettings.LISTEN)}
            checked={checked.indexOf(ESettings.LISTEN) !== -1}
            inputProps={{
              'aria-labelledby': 'switch-list-label-listen',
            }}
          />
        </ListItem>
      </List>
    );
  }
}