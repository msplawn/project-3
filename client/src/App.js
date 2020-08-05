import React, { useState, useEffect } from 'react';
import ToolBar from './components/Tools';
import Pads from './components/Pads';
import { Player, loaded } from "tone";
import './app.css';
import useDebounce from './hooks/useDebounce';
import axios from 'axios';

function App() {
  const [soundData, setSoundData] = useState([]);
  const stepsPerBar = 16;
  const barsPerSequence = 1;
  const totalSteps = stepsPerBar * barsPerSequence;
  const [BPM, setBPM] = useState(128);
  const [config, setConfig] = useState({
    bpm: 128
  });
  const updatedBpm = useDebounce(BPM);
  const initialBpm = 128;
  const [sequences, setSequences] = useState([]);
  const [currentSequence, setCurrentSequence] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    axios.get("/api/sequences")
      .then((result) => {
        console.log(result);
        setSequences(result.data);
      });
  }, []);

  useEffect(() => {
    if (currentSequence && currentSequence.sounds) {
      setSoundData(currentSequence.sounds);
    }
  },[currentSequence]);

  useEffect(() => {
    setConfig({ bpm: updatedBpm });
  }, [updatedBpm]);

  const handleBpmChange = (value) => {
    setBPM(value);
  };

  function handleClick(e, key, id) {
    e.preventDefault();
    const tempData = [...soundData];
    const foundSound = tempData.find(row => row.key === key);
    const foundStep = foundSound.steps.find(step => step.id === id);
    foundStep.active = !foundStep.active;
    setSoundData(tempData);
    sampleClick(foundSound.label);
  };

  const sampleClick = (sound) => {
    console.log(sound);
    const player = new Player(process.env.PUBLIC_URL + "/sounds/" + sound + ".wav").toDestination();
    loaded().then(() => {
      player.start();
    });
  }

  const toggleClass = () => {
    // console.log(sounds.array);
  };

  return (
    <main className="app">
      <header className="app_header">
        <h1 className="app_title">The Lily Pad</h1>
        <img src={process.env.PUBLIC_URL + "/cutiefrog.png"} alt="frog" id="frog" />
      </header>
      <div className="interface">
        <ToolBar
          setBPM={handleBpmChange}
          BPM={config.bpm}
          initialBpm={initialBpm}
          sequences={sequences}
          currentSequence={currentSequence}
          setCurrentSequence={setCurrentSequence}
          setCurrentStep={setCurrentStep}
        />
        <Pads
          count={totalSteps}
          handleClick={handleClick}
          BPM={BPM}
          soundData={soundData}
          currentStep={currentStep}
        />
      </div>
      <footer>

      </footer>
    </main >

  )
}

export default App