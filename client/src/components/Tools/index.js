import React, { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  Select,
  TextField,
  Typography,
  Toolbar,
  Grid
} from "@material-ui/core";
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Transport, Loop, Player, loaded, start } from "tone";


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
    padding: 10
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
  BPM,
  setBPM,
  initialBpm,
  sequences,
  currentSequence,
  setCurrentSequence
}) => {
  useEffect(() => {
    const beats = BPM || initialBpm;
    Transport.bpm.rampTo(beats, 1);
  },[BPM])

  useEffect(() => {
    const item = sequences.find(item => item.name === "Sequence 1");
    setCurrentSequence(item);
  },[sequences])

  const classes = useStyles();
  const [on, set] = useState(false);
  const play = () => {
    start();
    set(!on);
    const playerClosedHat = new Player(process.env.PUBLIC_URL + "/sounds/Closed-Hat.wav").toDestination();
    const playerOpenHat = new Player(process.env.PUBLIC_URL + "/sounds/Open-Hat.wav").toDestination();
    const playerSnare = new Player(process.env.PUBLIC_URL + "/sounds/Snare.wav").toDestination();
    const playerKick = new Player(process.env.PUBLIC_URL + "/sounds/Kick.wav").toDestination();

    if (!on) {
      let currentStep = 0;
      new Loop(
        function (time) {
          console.log(currentStep, currentSequence);
          // ------------ Closed Hat ----------------
          if (currentStep === currentSequence.sounds[0].steps.length - 1)  {
            currentStep = 0;
          } else {
            currentStep = currentStep + 1;
          }; 
          if (currentSequence.sounds[0].steps[currentStep].active) {
            loaded().then(() => {
              playerClosedHat.seek(0);
              playerClosedHat.start();
            });
          };

          // ------------ Open Hat ----------------
          if (currentSequence.sounds[1].steps[currentStep].active) {
            loaded().then(() => {
              playerOpenHat.seek(0);
              playerOpenHat.start();
            });
          };

          // ------------ Snare ----------------
          if (currentSequence.sounds[2].steps[currentStep].active) {
            loaded().then(() => {
              playerSnare.seek(0);
              playerSnare.start();
            });
          };

          // ------------ Kick ----------------
          if (currentSequence.sounds[3].steps[currentStep].active) {
            loaded().then(() => {
              playerKick.seek(0);
              playerKick.start();
            });
          };
        },
        "8n"
      ).start(0);

      Transport.start();
    } else {
      loaded().then(() => {
        playerClosedHat.stop();
        playerOpenHat.stop();
        playerSnare.stop();
        playerKick.stop();

      })
      Transport.stop();
      Transport.cancel();
    } 
  };

  const handleSequenceChange = (value) => {
    console.log(value);
    const item = sequences.find(item => item.name === value);
    console.log(item);
    setCurrentSequence(item);
  };

  return (

    <div>

      <CssBaseline />
      <Grid container>
      <Grid item xs={12}>
     
        <Grid container justify="center">
          <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <Typography variant="h4" color="inherit" id="tool-title" noWrap className={classes.toolbarTitle}>
                LILY-808
          </Typography>

          <Button variant="outlined" className={classes.button} on={on} onClick={play}>
            <SaveIcon />
          </Button>

              <Button id="play-button" variant="outlined" className={classes.button} on={on} onClick={play}>

                {on ? <StopIcon /> : <PlayArrowIcon />}
              </Button>

              <TextField type="number" placeholder={initialBpm} min={60} max={200} onChange={(e) => setBPM(e.currentTarget.value)} variant="outlined" className={classes.bpm} label="BPM" />

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="">Sequence</InputLabel>
                <Select
                  label="Sequence"
                  onChange={e => handleSequenceChange(e.currentTarget.value)}
                >
                  {sequences.map(item => {
                    return <option value={item.name}>{item.name}</option>
                  })}
                </Select>
              </FormControl>

            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
      </Grid>
    </div>
  );
};

export default Tools;