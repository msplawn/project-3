import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Select, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Paper, makeStyles } from "@material-ui/core";
import "./pads.css";

const Pads = ({ soundData, handleClick }) => {
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });

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