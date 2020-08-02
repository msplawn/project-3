import React, { useState, useEffect } from 'react'
import ToolBar from './components/Tools'
import Pads from './components/Pads'
import { Player, loaded } from "tone";
// import TrackList from './components/TrackList'
// import PlayHead from './components/PlayHead'
// import { Provider } from './hooks/useStore'
import useTimer from './hooks/useTimer'
// import useStyles from './hooks/useStyles'
import './app.css'
import Frog from './assets/cutiefrog.png'

function App() {
  const [soundData, setSoundData] = useState([])

  useEffect(() => {
    const sounds = ['Closed-Hat', 'Open-Hat', 'Snare', 'Kick'];
    const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    const rows = sounds.map(sound => (
      {
        sound,
        steps: steps.map(step => ({ id: step }))
      }
    ));
    setSoundData(rows);
  }, []);

  function handleClick(e, sound, id) {
    e.preventDefault();
    const tempData = [...soundData];
    const foundSound = tempData.find(row => row.sound === sound);
    const foundStep = foundSound.steps.find(step => step.id === id);
    foundStep.active = !foundStep.active;
    setSoundData(tempData);
    // console.log(sound)
    sampleClick(sound)
  };

  const sampleClick = (sound) => {
    console.log(sound);
    const player = new Player(process.env.PUBLIC_URL + "/sounds/" + sound + ".wav").toDestination();
    loaded().then(() => {
      player.start();
    });
  }

  const baseBPMPerOneSecond = 60
  const stepsPerBar = 16
  const beatsPerBar = 4
  const barsPerSequence = 1
  const totalSteps = stepsPerBar * barsPerSequence
  const totalBeats = beatsPerBar * barsPerSequence

  const [BPM, setBPM] = useState(128)
  const [startTime, setStartTime] = useState(null)
  const [pastLapsedTime, setPastLapse] = useState(0)
  const [currentStepID, setCurrentStep] = useState(null)
  // const [getNotesAreaWidthInPixels] = useStyles(totalSteps)

  // const notesAreaWidthInPixels = getNotesAreaWidthInPixels(totalSteps)
  // const timePerSequence = baseBPMPerOneSecond / BPM * 1000 * totalBeats
  // const timePerStep = timePerSequence / totalSteps
  const isSequencePlaying = startTime !== null
  const playerTime = useTimer(isSequencePlaying)
  const lapsedTime = isSequencePlaying ? Math.max(0, playerTime - startTime) : 0
  const totalLapsedTime = pastLapsedTime + lapsedTime


  // useEffect(() => {
  //     if (isSequencePlaying) {
  //         setCurrentStep(Math.floor(totalLapsedTime / timePerStep) % totalSteps)
  //     } else {
  //         setCurrentStep(null)
  //     }
  // }, [isSequencePlaying, timePerStep, totalLapsedTime, totalSteps])

  // const toolBarProps = {
  //     setStartTime,
  //     setPastLapse,
  //     setBPM,
  //     isSequencePlaying,
  //     startTime,
  //     BPM
  // }


  const playHeadProps = {
    // notesAreaWidthInPixels,
    // timePerSequence,
    totalLapsedTime
  }

  // const trackListProps = {
  //     currentStepID
  // }

  return (
    <main className="app">
      <header className="app_header">
        <h1 className="app_title">The Lily Pad</h1>
        <img src={process.env.PUBLIC_URL + "/cutiefrog.png"} id="frog" />
      </header>
      <div className="interface">
        <ToolBar 
          soundData={soundData}
        />
        <Pads 
          count={totalSteps} 
          handleClick={handleClick} 
          soundData={soundData}
        />
      </div>
      {/* <div className="app_content">
                    <PlayHead {...playHeadProps} />
                    <TrackList {...trackListProps} />
                </div> */}
      <footer>

      </footer>
    </main >

  )
}

export default App