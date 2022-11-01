import { Grid, Box, Typography, TextField, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import "./Login.css";

function Login() {

    return (
        <Grid container alignItems="center">
            <Grid item xs={6} textAlign="center">
                <Box padding={20}>
                    <form>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" className="texto">Entrar</Typography>
                        <TextField label="Usuário (e-mail)" name="usuario" fullWidth margin="normal"></TextField>
                        <TextField label="Senha" name="senha" fullWidth type="password" margin="normal"></TextField>
                        <Box marginTop={2}>
                            <Link to="/home" className="text-decorator-none">
                            <Button type="submit" variant="contained">
                                Logar
                            </Button>
                            </Link>
                        </Box>
                    </form>
                    <Box display="flex" justifyContent="center" marginTop={2} alignItems="center">
                        <Box marginRight={1}>
                            <Typography variant="subtitle1" >Ainda não tem uma conta?</Typography>
                        </Box>
                            <Typography variant="subtitle1" className="texto">Cadastre-se</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={6} className= "fundo">

            </Grid>
        </Grid>
    );
}

export default Login;