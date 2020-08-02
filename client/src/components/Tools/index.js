import React, { useState } from "react";
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
import { Transport, Loop, Sequence, Player, loaded } from "tone";


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
  toggleContainer: {
    margin: theme.spacing(2, 0),
  },
  button: {
    margin: theme.spacing(0.1, 0.5),
    padding: 15,
    backgroundColor: "#ff6f00",
    color: "white",
    width: "0%",
  },
  bpm: {
    margin: theme.spacing(0.5),
    width: 80,

  },
  formControl: {
    margin: theme.spacing(0.5),
    minWidth: 110,
  },
}));

const Tools = ({
  initialBPM,
  soundData
}) => {

  // const [currentStep, setCurrentStep] = useState(0);

  const classes = useStyles();
  const [on, set] = useState(false);
  const play = () => {
    set(!on);
    const player = new Player(process.env.PUBLIC_URL + "/sounds/Closed-Hat.wav").toDestination();
    if (!on) {
      let currentStep = 0;
      const loop = new Loop(
        function (time) {
          console.log(currentStep, soundData[0].steps.length);
          if (currentStep === soundData[0].steps.length - 1)  {
            currentStep = 0;
          } else {
            console.log("ELSE");
            currentStep = currentStep + 1;
            console.log("CURRENTSTEP + 1", currentStep + 1);
          }; 
          if (soundData[0].steps[currentStep].active) {
            loaded().then(() => {
              player.seek(0);
              player.start();
            });
          };
        },
        "4n"
      ).start(0);
      Transport.start();
    } else {
      loaded().then(() => {
        player.stop();
      })
      Transport.stop();
    }
  };

  const [bpm, sets] = useState(initialBPM);
  const setBpm = e => sets(e.target.value);

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
              <Button variant="outlined" className={classes.button} on={on} onClick={play}>
                {on ? <StopIcon /> : <PlayArrowIcon />}
              </Button>
              <TextField type="number" value={bpm} min={60} max={200} onChange={setBpm} variant="outlined" className={classes.bpm} label="BPM" />
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="">Sequence</InputLabel>
                <Select
                  label="Sequence"
                  labelId=""
                  id=""
                  value={""}
                  onChange={"e => selectSequence(+e.target.value)"}

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
