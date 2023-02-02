import {  Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom";



const Modal = () => {
 return (
   <Box>
      <Grid
         container
         direction="column"
         justifyContent="center"
         alignItems="center"
         spacing={2}
       >
           <Typography> Modal here </Typography>
       </Grid> 
   </Box>
 );
};

ReactDOM.render(
 <React.StrictMode>
       <Modal />
 </React.StrictMode>,
 document.getElementById("root")
);
