import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { ChangeEvent, useEffect, useState } from "react";
import Usuario from "../../models/Usuario";
import { cadastroUsuario } from "../../services/Service";
import "./CadastroUsuario.css";

function CadastroUsuario() {

    let history = useNavigate();
    const [confirmarSenha, setConfirmarSenha] = useState<String>("")
    const [usuario, setUsuario] = useState<Usuario>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto:''
        })

    const [usuarioResult, setUsuarioResult] = useState<Usuario>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        })

    useEffect(() => {
        if (usuarioResult.id !== 0) {
            history("/login")
        }
    }, [usuarioResult]);


    function confirmarSenhaHandle(event: ChangeEvent<HTMLInputElement>){
        setConfirmarSenha(event.target.value)
    }


    function updatedModel(event: ChangeEvent<HTMLInputElement>) {

        setUsuario({
            ...usuario,
            [event.target.name]: event.target.value
        })

    }
    async function logar(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        if(confirmarSenha == usuario.senha){
        cadastroUsuario(`/usuarios/cadastrar`, usuario, setUsuarioResult)
        alert('Usuário cadastrado com sucesso!')
        } else{
            alert('Dados inconsistentes. Favor verificar as informações de cadastro!')
        }
    }


    return(
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={6} className="imagemC"></Grid>
            <Grid item xs={6} alignItems="center">
                <Box paddingX={10}>
                <form onSubmit={logar}>
                    <Typography variant="h5" gutterBottom color="textPrimary" component="h5" className="textoC">Cadastrar</Typography>
                    <TextField onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)}
                    value={usuario.nome} 
                    label="Nome" name="nome" fullWidth margin="normal"></TextField>

                    <TextField onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)} 
                    value={usuario.usuario}
                    label="Usuário" name="usuario" fullWidth margin="normal"></TextField>

                    <TextField onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)} 
                    value={usuario.senha}
                    label="Senha" name="senha" fullWidth type="password" margin="normal"></TextField>

                    <TextField onChange={(event: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(event)} 
                    value={confirmarSenha}
                    label="Confirmar Senha" name="confirmarSenha" fullWidth type="password" margin="normal"></TextField>

                    <Box marginTop={2} textAlign="center">
                        <Link to="/login" className="text-decorator-none">
                            <Button variant="contained" color="secondary" className="btnCancelar">
                                Cancelar
                            </Button>
                        </Link>
                        <Button type="submit" variant="contained" color="primary">
                                Cadastrar
                        </Button>
                    </Box>
                </form>
                </Box>
            </Grid>
            
        </Grid>
    );

}

export default CadastroUsuario;