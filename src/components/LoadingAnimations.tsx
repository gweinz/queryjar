import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

interface IProps {
    width: number,
    num: number,
}

export default function SkeletonAnimation({width, num}: IProps) {
  return (

    <Box pt={2} sx={{ width }}>
        {Array.from(Array(num).keys()).map((el, i) => {
            return ( 
                <Skeleton key={i} />
            );
        })}
    </Box>
  );
}