import React from 'react';
import { Box, Grid, Button, Select, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Paper, makeStyles } from "@material-ui/core";
import "./pads.css"
// import Sequences from "../../../../models/index"
// import Sounds from "../../../public/sounds"

const Pads = ({ count = 0 }) => {
    // let content = [...Array(count)].map((el, i) => <div className="pad" key={i + 1}>{i + 1}</div>)

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Closed Hat'),
        createData('Open Hat'),
        createData('Snare'),
        createData('Kick'),
    ];



    return (
        <div>
            <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sound</TableCell>
                            <TableCell align="center">1</TableCell>
                            <TableCell align="center">2</TableCell>
                            <TableCell align="center">3</TableCell>
                            <TableCell align="center">4</TableCell>
                            <TableCell align="center">5</TableCell>
                            <TableCell align="center">6</TableCell>
                            <TableCell align="center">7</TableCell>
                            <TableCell align="center">8</TableCell>
                            <TableCell align="center">9</TableCell>
                            <TableCell align="center">10</TableCell>
                            <TableCell align="center">11</TableCell>
                            <TableCell align="center">12</TableCell>
                            <TableCell align="center">13</TableCell>
                            <TableCell align="center">14</TableCell>
                            <TableCell align="center">15</TableCell>
                            <TableCell align="center">16</TableCell>
                        
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right" className="pad"></TableCell>
                                <TableCell align="right" className="pad"></TableCell>
                                <TableCell align="right" className="pad"></TableCell>
                                <TableCell align="right" className="pad"></TableCell>
                                <TableCell align="right" className="pad"></TableCell>
                                <TableCell align="right" className="pad"></TableCell>
                                <TableCell align="right" className="pad"></TableCell>
                                <TableCell align="right" className="pad"></TableCell>
                                <TableCell align="right" className="pad"></TableCell>
                                <TableCell align="right" className="pad"></TableCell>
                                <TableCell align="right" className="pad"></TableCell>
                                <TableCell align="right" className="pad"></TableCell>
                                <TableCell align="right" className="pad"></TableCell>
                                <TableCell align="right" className="pad"></TableCell>
                                <TableCell align="right" className="pad"></TableCell>
                                <TableCell align="right" className="pad"></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Pads;