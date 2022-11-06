import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import "./HomeT.css";

function HomeT() {
    return (
    <>
        <Grid container justifyContent="center" className="container">
            <Grid alignItems= "center" item xs= {6}>
                <Box paddingX={15}>
                    <Typography variant="h3" gutterBottom component="h3" align="center" className="escritos"> Seja Bem Vindo(a)!</Typography>
                    <Typography variant="h5" gutterBottom component="h5" align="center" className="escritos"> Acompanhe as postagens do nosso feed de notícias!</Typography>
                </Box>
                <Box display="flex" justifyContent="center">
                    <Box marginRight={1}>
                    </Box>
                    <Button variant="outlined" className="botao">Ver Postagens</Button>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <img src="https://i.imgur.com/WYzfxmf.png" alt="Logo da página" className="img"/>
            </Grid>
            <Grid xs={12} className="postagem">
            </Grid>
        </Grid>
    </>
    )
}

export default HomeT;