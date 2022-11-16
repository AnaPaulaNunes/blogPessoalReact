import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToken } from '../../../store/tokens/actions';
import { TokenState } from '../../../store/tokens/tokensReducer';
//import useLocalStorage from 'react-use-localstorage';
import {toast} from "react-toastify";
import "./Navbar.css";

function Navbar() {

    //const [token, setToken] = useLocalStorage("token");
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )

    function goLogout() {
        dispatch(addToken(""))
        toast.info("Usuário deslogado!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        })
        navigate("/login")
    }

    var navbarComponent;

    if(token !== "") {
        navbarComponent = 
        <AppBar position="static" className="navbar">
        <Toolbar variant="dense">
            <Grid container justifyContent= "space-between">
            <Box className= "cursor">
                <Typography variant="h5" color="inherit">
                    Blog Pessoal
                </Typography>
            </Box>

            <Box display="flex" justifyContent="start">
                <Link to="/home" className="text-decorator-none">
                <Box mx={1} className= "cursor">
                    <Typography variant="h6" color="inherit">
                        Home
                    </Typography>
                </Box>
                </Link>

                <Link to="/postagens" className="text-decorator-none">
                <Box mx={1} className= "cursor">
                    <Typography variant="h6" color="inherit">
                        Postagens
                    </Typography>
                </Box>
                </Link>

                <Link to="/temas" className="text-decorator-none">
                <Box mx={1} className= "cursor">
                    <Typography variant="h6" color="inherit">
                        Temas
                    </Typography>
                </Box>
                </Link>

                <Link to="/formularioTema" className="text-decorator-none">
                <Box mx={1} className= "cursor">
                    <Typography variant="h6" color="inherit">
                        Cadastrar tema
                    </Typography>
                </Box>
                </Link>

                    <Box mx={1} className= "cursor" onClick={goLogout}>
                        <Typography variant="h6" color="inherit">
                        Logout
                        </Typography>
                    </Box>
                
            </Box>
            </Grid>
        </Toolbar>
    </AppBar>
    }

    return (
        <>
        {navbarComponent}
        </>
    )
} ;

export default Navbar;
