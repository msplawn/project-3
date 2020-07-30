import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Select, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Paper, makeStyles } from "@material-ui/core";
import "./pads.css";
import { Player, loaded } from "tone";
// import Sequences from "../../../../models/index"
// import Sounds from "../../../public/sounds"
console.log(Player);
const Pads = ({ count = 0 }) => {
    // let content = [...Array(count)].map((el, i) => <div className="pad" key={i + 1}>{i + 1}</div>)
    const [clicked, setClicked] = useState(false);
    const [soundData, setSoundData] = useState([])
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });

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
        SampleClick(sound)
    };

    const SampleClick = (sound) => {
        console.log(sound);
        const player = new Player(process.env.PUBLIC_URL + "/sounds/" + sound + ".wav").toDestination();
                loaded().then(() => {
                    player.start();
                }); 
    }


    if (soundData.length) {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead >
                            <TableRow >
                                <TableCell align="right" >Sound</TableCell>
                                {soundData[0].steps.map(item => <TableCell align="center" key={item.id} >{item.id}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {soundData.map((row) => (
                                <TableRow key={row.sound}>
                                    <TableCell component="th" scope="row" align="right">
                                        {row.sound}
                                    </TableCell>
                                    {row.steps.map(item => <TableCell align="center" className={`pad ${item.active ? "clicked" : ""}`}
                                        key={`${row.sound}-${item.id}`}
                                        onClick={(e) => handleClick(e, row.sound, item.id)}></TableCell>)}

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
    return null;
}

export default Pads;