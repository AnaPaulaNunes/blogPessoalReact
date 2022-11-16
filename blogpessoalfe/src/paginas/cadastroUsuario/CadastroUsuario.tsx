import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { ChangeEvent, useEffect, useState } from "react";
import Usuario from "../../models/Usuario";
import { cadastroUsuario } from "../../services/Service";
import "./CadastroUsuario.css";
import { toast } from "react-toastify";

function CadastroUsuario() {

    let history = useNavigate();

    //state reservado apenas para pegar o campo de confirmação de senha, não vai para o backend
    const [confirmarSenha, setConfirmarSenha] = useState<String>("")

    // esse state leva os dados para o backend
    const [usuario, setUsuario] = useState<Usuario>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto:''
        })

    // state que retornará os dados do backend (devido a senha que volta criptografada)
    const [usuarioResult, setUsuarioResult] = useState<Usuario>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        })


// função para confirmar se a senha digitado no campo senha é igual ao digitado no confirmar senha
    function confirmarSenhaHandle(event: ChangeEvent<HTMLInputElement>){
        setConfirmarSenha(event.target.value)
    }

// função que irá atualizar o state com os dados digitados junto com o formulário
    function updateModel(event: ChangeEvent<HTMLInputElement>) {

        setUsuario({
            ...usuario,
            [event.target.name]: event.target.value
        })

    }
    async function cadastrar(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        // verificação dos campos de senha
        //= -> atribuição de valor (o valor que determinada variável irá receber)
        //== -> checa se o conteúdo é igual
        //=== -> checa o conteúdo e o tipo de conteúdo digitado (string, number, etc)

        // o length significa o mínimo de caracteres que a senha deve conter
        if(confirmarSenha === usuario.senha && usuario.senha.length >= 8){
            try {
                await cadastroUsuario(`/usuarios/cadastrar`, usuario, setUsuarioResult)
                toast.success("Usuário cadastrado com sucesso!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                })
            } catch (error) {
                toast.error("Falha interna ao cadastrar. Dados inconsistentes!", {
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
        } else{
            // msg de erro para o caso de não passar no if das senhas 
            alert("As senhas não conferem. Favor verificar novamente!");
            setUsuario({... usuario, senha: " "}); // zera o campo da senha, apaga o que foi digitado
            setConfirmarSenha(" "); // zera o campo da senha, apaga o que foi digitado
        }
    }

    //assim que receber o ID de retorno do cadastro do backend, redireciona para a tela de login
    useEffect(() => {
        if (usuarioResult.id !== 0) {
            history("/login")
        }
    }, [usuarioResult]);


    return(
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={6} className="imagemC"></Grid>
            <Grid item xs={6} alignItems="center">
                <Box paddingX={10}>
                <form onSubmit={cadastrar}>
                    <Typography variant="h5" gutterBottom color="textPrimary" component="h5" className="textoC">Cadastre-se</Typography>
                    <TextField onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                    value={usuario.nome} 
                    label="Nome" name="nome" fullWidth margin="normal"></TextField>

                    <TextField onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)} 
                    value={usuario.usuario}
                    label="Usuário (e-mail)" name="usuario" fullWidth margin="normal" required 
                    placeholder="Digite um e-mail válido"></TextField>

                    <TextField onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                    value={usuario.foto}
                    label="URL da foto" name="foto" fullWidth margin="normal"></TextField>

                    <TextField onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)} 
                    value={usuario.senha}
                    label="Senha" name="senha" fullWidth type="password" margin="normal"
                    placeholder="Digite no mínimo 8 caracteres"></TextField>

                    <TextField onChange={(event: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(event)} 
                    value={confirmarSenha}
                    label="Confirmar Senha" name="confirmarSenha" fullWidth type="password" margin="normal"></TextField>

                    <Box display="flex" justifyContent="center" marginTop={2} textAlign="center">
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