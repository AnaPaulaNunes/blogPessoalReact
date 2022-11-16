import { Grid, Box, Typography, TextField, Button } from '@mui/material';
import React, {ChangeEvent, useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
//import useLocalStorage from 'react-use-localstorage';
import UsuarioLogin from '../../models/UsuarioLogin';
import { login } from '../../services/Service';
import { addToken } from '../../store/tokens/actions';
import "./Login.css";

function Login() {

    let history = useNavigate();
    const dispatch = useDispatch();
    const [token, setToken] = useState("");
    //const [token, setToken] = useLocalStorage("token");

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        }
    );

    function updateModel(event: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [event.target.name]: event.target.value,
        })
    }

    useEffect(()=>{
        if(token !== '') {
            dispatch (addToken(token))
            history("/home");
        }
    }, [token]);


    async function logar(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();

        try{
            await login('usuarios/logar', usuarioLogin, setToken)
            toast.success("Usuário logado com sucesso!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            })
        } catch(error) {
            toast.error("Dados do usuário inconsistentes. Erro ao logar!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            })
        }
    }


    return (
        <Grid container alignItems="center">
            <Grid item xs={6} textAlign="center">
                <Box padding={20}>
                    <form onSubmit={logar}>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" className="texto">Entrar</Typography>
                        <TextField onChange={(event: ChangeEvent<HTMLInputElement>)=> updateModel(event)} 
                        value={usuarioLogin.usuario} 
                        label="Usuário (e-mail)" name="usuario" fullWidth margin="normal"></TextField>

                        <TextField onChange={(event: ChangeEvent<HTMLInputElement>)=> updateModel(event)} 
                        value={usuarioLogin.senha}
                        label="Senha" name="senha" fullWidth type="password" margin="normal"></TextField>

                        <Box marginTop={2}>
                            <Button type="submit" variant="contained">
                                Logar
                            </Button>
                        </Box>
                    </form>

                    <Box display="flex" justifyContent="center" marginTop={2} alignItems="center">
                        <Box marginRight={1}>
                            <Typography variant="subtitle1" >Ainda não tem uma conta?</Typography>
                        </Box>
                        <Link to="/cadastrousuario">
                        <Typography variant="subtitle1" gutterBottom className="texto">Cadastre-se</Typography>
                        </Link>
                            
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={6} className= "imagem">

            </Grid>
        </Grid>
    );
}

export default Login;