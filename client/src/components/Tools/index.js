import React from "react";
import {
AppBar,
  Box,
  Button,
  Select,
  TextField,
  Typography,
  Toolbar,
  Grid
} from "@material-ui/core";
import { Types } from "mongoose";
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import CssBaseline from '@material-ui/core/CssBaseline';


//STYLES

const useStyles = makeStyles((theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: "#ce93d8",
      padding: 20
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(0.1, 0.5),
      backgroundColor: "#ff6f00", 
      color: "white",
      width: "0%",
    },
    bpm:  {
        margin: theme.spacing(0.5),
        width: 64,
        
    },
    formControl: {
        margin: theme.spacing(0.5),
        minWidth: 110,
      },
  }));

const Tools = () => {
 
const classes = useStyles();
 
  return (
    
    <div>
   
      <CssBaseline />
      <Box>
        <Grid container justify="center">
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h4" color="inherit" noWrap className={classes.toolbarTitle}>
            LILY-808
          </Typography>   
          <Button variant="outlined" className={classes.button}>
            <StopIcon />
          </Button>
          <Button variant="outlined" className={classes.button}>
          <PlayArrowIcon />
          </Button>
          <TextField variant="outlined" className={classes.bpm} label="BPM"/>
          <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="">Sequence</InputLabel>
        <Select
          labelId=""
          id=""
          value={""}
          onChange={""}
          
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={1}>Sequence 1</MenuItem>
          <MenuItem value={2}>Sequence 2</MenuItem>
          <MenuItem value={3}>Sequence 3</MenuItem>
        </Select>
      </FormControl>
  
        </Toolbar>
      </AppBar>
      </Grid>
      </Box>
      </div>
  );
};

export default Tools;
