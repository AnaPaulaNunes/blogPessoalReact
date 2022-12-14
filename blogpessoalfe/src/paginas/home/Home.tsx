import { Grid, Typography, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import useLocalStorage from 'react-use-localstorage';
import TabPostagem from '../../components/postagens/tabpostagem/TabPostagem';
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem";
import './Home.css';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function Home() {

    let navigate = useNavigate();
    //const [token, setToken] = useLocalStorage("token");
    //constante que vai armazenar o meu token
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )

    useEffect(() => {
        if (token == "") {
            toast.error("Você precisa estar logado!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
            navigate("/login")
        }
    }, [token])

    
    return (
    <>
        <Grid container direction="row" justifyContent="center" alignItems="center" className="container">
                <Grid alignItems="center" item xs={6}>
                    <Box paddingX={20} >
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className= "titulo">
                            Seja bem vindo(a)!</Typography>

                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className= "titulo">
                            Expresse aqui os seus pensamentos e opiniões!</Typography>
                    </Box>

                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                            <ModalPostagem />
                        </Box>
                        <Link to="postagens" className= "text-decorator-none">
                            <Button variant="outlined" className ="botaoPost">Ver Postagens</Button>
                        </Link>
                    </Box>
                </Grid>

                <Grid item xs={6} >
                    <img src="https://i.imgur.com/gEEWAaf.png" alt="" width="650px" height="550px" />
                </Grid>
                <Grid xs={12} className="postagens">
                    <TabPostagem />
                </Grid>
            </Grid>
    </>
    )
}

export default Home;