import React from 'react';
import './Header.css'
import logo from './StoveTopLogo.png';
import { Box, Typography, Grid } from "@mui/material";



export function Header() {

    return (
        <div className="header">
            <Grid container spacing={0.2}>
                <Grid xs={0.7}>
                <img src={logo} width="75" height="75"/>
                </Grid>
                <Grid xs={2}>
                    <br></br>
                    <Typography fontSize={29}><strong>STOVE TOP</strong></Typography>
                </Grid>
            </Grid>
        </div>
    )
}
