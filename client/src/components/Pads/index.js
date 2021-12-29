import React from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper


} from "@material-ui/core";
import "./pads.css";

const Pads = ({ soundData, handleClick, currentStep }) => {
  if (soundData && soundData.length) {
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
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
                    <TableRow key={row.key}>
                      <TableCell component="th" scope="row" align="right">
                        {row.label}
                      </TableCell>
                      {row.steps.map((item, index) => {
                          const padStyle = `pad ${item.active ? "clicked" : ""}`;
                          const activePad = `${(index === currentStep) ? " active" : ""}`;
                        return (
                        <TableCell
                          align="center"
                          className={padStyle + activePad}
                          key={`${row.sound}-${item.id}`}
                          onClick={(e) => handleClick(e, row.key, item.id)}
                        >
                            <div className="innerpad"></div>
                        </TableCell>
                        )
                      })}
                    </TableRow>
                    
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    );
  }
  return null;
};

export default Pads;