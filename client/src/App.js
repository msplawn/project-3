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
  const [BPM, setBPM] = useState(null);
  const [config, setConfig] = useState({
    bpm: null
  });
  const updatedBpm = useDebounce(BPM);
  const initialBpm = 128;

  useEffect(() => {
    axios.get("/api/sequences")
    .then((result) => {
      console.log(result);
      setSoundData(result.data[0].sounds);
    });
    // const sounds = ['Closed-Hat', 'Open-Hat', 'Snare', 'Kick'];
    // const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    // const rows = sounds.map(sound => (
    //   {
    //     sound,
    //     steps: steps.map(step => ({ id: step }))
    //   }
    // ));
    // setSoundData(rows);
  }, []);

  useEffect(() => {
    setConfig({ bpm: updatedBpm });
  },[updatedBpm]);

   const handleBpmChange = (value) => {
      setBPM(value);
   };

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

  return (
    <main className="app">
      <header className="app_header">
        <h1 className="app_title">The Lily Pad</h1>
        <img src={process.env.PUBLIC_URL + "/cutiefrog.png"} id="frog" />
      </header>
      <div className="interface">
        <ToolBar 
          soundData={soundData}
          setBPM={handleBpmChange}
          BPM={config.bpm}
          initialBpm={initialBpm}
        />
        <Pads 
          count={totalSteps} 
          handleClick={handleClick} 
          soundData={soundData}
          BPM={BPM}
        />
      </div>
      <footer>

      </footer>
    </main >

  )
}

export default App