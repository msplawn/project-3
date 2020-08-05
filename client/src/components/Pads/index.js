import React, { useState, useEffect } from "react";
import {
    Grid,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    Paper,
    makeStyles,
} from "@material-ui/core";
import "./pads.css";

const Pads = ({ soundData, handleClick }) => {

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });

    const classes = useStyles();

    if (soundData.length) {
        return (
            <div>
                <Card>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12}>
                                <TableContainer component={Paper} id="table">
                                    <Table className={classes.table} className="steps" aria-label="simple table" size="large">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="right">Sound</TableCell>
                                                {soundData[0].steps.map((item) => (
                                                    <TableCell align="center" key={item.id}>
                                                        {item.id}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {soundData.map((row) => (
                                                <TableRow key={row.sound}>
                                                    <TableCell component="th" scope="row" align="right">
                                                        {row.sound}
                                                    </TableCell>
                                                    {row.steps.map((item) => (

                                                        <TableCell
                                                            align="center"
                                                            className={`pad ${item.active ? "clicked" : ""}`}
                                                            key={`${row.sound}-${item.id}`}
                                                            onClick={(e) => handleClick(e, row.sound, item.id)}
                                                        >
                                                            <div class="innerpad"></div>
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        );
    }
    return null;
};

export default Pads;
