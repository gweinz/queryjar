import * as React from 'react';
import Box from '@mui/material/Box';

export default function Logo() {

  return ( 
    
    <Box
        component="img"
        sx={{
        height: 50,
        width: 50,
        maxHeight: { xs: 50, md: 50 },
        maxWidth: { xs: 50, md: 50 },
        }}
        alt="Logo."
        src="queryjar.png"
    />
  );
}