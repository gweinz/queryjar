import { BottomNavigation, BottomNavigationAction, Box,  createTheme,  Divider,  Grid, 
   Stack, Theme, ThemeProvider, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Search from "../components/Search";
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import { makeStyles, createStyles } from '@mui/styles';
import Logo from "../components/Logo";
import SearchIcon from '@mui/icons-material/Search';
import CreateRecipe from "../components/CreateRecipe";
import Home from "../components/Home";
import "@fontsource/roboto-mono"; 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      color: "#5e17eb",
    },
    stickToBottom: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      left: 0,
    },
  }),
);

const theme = createTheme({
  palette: {
    primary: {
      main: "#5e17eb",
    },
  },
  typography: {
    fontFamily: [
      "Roboto Mono",
      'monospace',
    ].join(','), 
  }
});

const Header = () => {
  return (
    <Grid item>
    <Box m={1}>
      <Stack direction="row" alignItems="center">
          <Logo />
      </Stack>
    </Box>
  </Grid>
  );
}

const Popup = () => {

  const [value, setValue] = useState(0);

  const classes = useStyles();

  return (
    <Box sx={{ width:350, height:550, p:2 }}>
       <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
            <Grid item>
              <Header />
            </Grid>

            {value === 0  && <Grid item> <Search /> </Grid> }
              
            {value === 1  &&  <Grid item> <CreateRecipe /> </Grid>}

            {value === 2 && <Grid item> <Home /> </Grid>}

            <Grid item>
              <Box 
                borderTop={2}
                borderColor={"#F5F5F5"} 
                className={classes.stickToBottom}
              >
                  <BottomNavigation 
                    showLabels={false}
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  >
                    <BottomNavigationAction disableRipple
                      icon={<SearchIcon style={{ color:  value === 0 ? "#5e17eb" : "#C5C5C5" }} />} 
                      classes={{label: classes.label}}
                    />
                    <BottomNavigationAction disableRipple
                      icon={<CreateIcon style={{ color: value === 1 ? "#5e17eb" : "#C5C5C5" }} />} 
                      classes={{label: classes.label}}
                    />
                    <BottomNavigationAction disableRipple
                      icon={<HomeIcon style={{ color: value === 2 ? "#5e17eb" : "#C5C5C5" }} />} 
                      classes={{label: classes.label}}
                    />
                  </BottomNavigation>
                </Box>
            </Grid>
        </Grid> 
    </Box>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <Popup />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
