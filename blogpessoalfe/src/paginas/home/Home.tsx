import { Grid, Typography, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import React from 'react';
import './Home.css';

function Home() {
    return (
    <>
        <Grid container direction="row" justifyContent="center" alignItems="center" style={{ backgroundColor: "purple" }}>
                <Grid alignItems="center" item xs={6}>
                    <Box paddingX={20} >
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" style={{ color: "white", fontWeight: "bold" }}>
                            Seja bem vindo(a)!</Typography>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" style={{ color: "white", fontWeight: "bold" }}>
                            Expresse aqui os seus pensamentos e opiniões!</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                        </Box>
                        <Button variant="outlined" style={{ borderColor: "white", backgroundColor: "purple", color: "white" }}>Ver Postagens</Button>
                    </Box>
                </Grid>
                <Grid item xs={6} >
                    <img src="https://miro.medium.com/max/1400/1*TMYPt-WhRNKUTdXXQ0N2SQ.jpeg" alt="" width="600px" height="500px" />
                </Grid>
                <Grid xs={12} style={{ backgroundColor: "white" }}>
                </Grid>
            </Grid>
    </>
    )
}

export default Home;