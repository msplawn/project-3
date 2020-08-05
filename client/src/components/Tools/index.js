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
import { Transport, Loop, Player, Players, loaded, start } from "tone";
import axios from "axios";
import fileDownload from 'react-file-download';

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
  }, [BPM])

  useEffect(() => {
    console.log("SEQUENCES:", sequences);
    const item = sequences.find(item => item.name === "Sequence 1");
    console.log("ITEM", item);
    setCurrentSequence(item);
  }, [sequences])

  const classes = useStyles();
  const [on, set] = useState(false);
  const play = () => {
    start();
    set(!on);
    const basePath = `${process.env.PUBLIC_URL}/sounds/`;
    const audio = {
      closedHat: `${basePath}Closed-Hat.wav`,
      openHat: `${basePath}Open-Hat.wav`,
      snare: `${basePath}Snare.wav`,
      kick: `${basePath}Kick.wav`,
    };

    const players = new Players(audio).toMaster();

    if (!on) {
      let currentStep = 0;
      new Loop(
        function (time) {
          console.log(currentStep, currentSequence);
          // ------------ Closed Hat ----------------
          if (currentStep === 15) {
            currentStep = 0;
          } else {
            currentStep = currentStep + 1;
          };
          if (currentSequence && currentSequence.sounds && currentSequence.sounds.length) {
            if (players.loaded) {
              currentSequence.sounds.forEach(item => {
                if (item.steps[currentStep].active) {
                  players.player(item.key).start();
                }
              });
            }
          }
        },
        "8n"
      ).start(0);

      Transport.start();
    } else {
      if (players.loaded) {
        players.stopAll();
      }
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

  const download = () => {
    axios.post("/api/download", currentSequence).then(() => {
      console.log("Download", "dowloaded");
      fileDownload(JSON.stringify(currentSequence.sounds, null, 2), "pattern.json");
    })
  }

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
                <Button variant="outlined" className={classes.button} on={on} onClick={download}>
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