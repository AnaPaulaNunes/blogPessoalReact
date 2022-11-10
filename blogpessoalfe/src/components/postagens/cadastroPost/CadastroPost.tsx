import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@material-ui/core"
import './CadastroPost.css';
import { useNavigate, useParams } from 'react-router-dom';
import Tema from '../../../models/Tema';
import useLocalStorage from 'react-use-localstorage';
import Postagem from '../../../models/Postagem';
import { busca, buscaId, post, put } from '../../../services/Service';

function CadastroPost() {

    let navigate = useNavigate();
    const { id } = useParams<{ id: string}>();
    const [temas, setTemas] = useState<Tema[]>([]);
    const [token, setToken] = useLocalStorage("token");

    useEffect(() => {
        if(token == "") {
            alert("Você precisa estar logado!")
            navigate("/login")
        }
    }, [token])

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ""
    })

    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: "",
        texto: "",
        data: "",
        tema: null
    })

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [token]);

    async function getTemas() {
        await busca("/temas", setTema, {
            headers: {"Authorization": token }
        })
    }

    async function findByIdPostagem(id: string) {
        await buscaId(`/postagens/${id}`, setPostagem, {
            headers: {"Authorization": token }
        })
    }

    useEffect(() => {
        getTemas()
        if(id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    function updatePostagem(event: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [event.target.name]: event.target.value,
            tema: tema
        })
    }

    async function cadastrar(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()

        if(id !== undefined){
            put(`/postagens`, postagem, setPostagem, {
                headers: {"Authorization": token }
            })
            alert("Postagem atualizada com sucesso!")
        } else {
            post(`/postagens`, postagem, setPostagem, {
                headers: {"Authorization": token }
            })
            alert("Postagem cadastrada com sucesso!")
        }
        back()
    }

    function back() {
        navigate("/postagens")
    }


    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={cadastrar} >
                <Typography variant="h3" color="textSecondary" align="center" >
                    Formulário de cadastro postagem</Typography>
                
                <TextField 
                id="titulo" 
                value={postagem.titulo}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updatePostagem(event)}
                label="titulo" 
                variant="outlined" 
                name="titulo" 
                margin="normal" 
                fullWidth />

                <TextField 
                id="texto" 
                value={postagem.texto}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updatePostagem(event)}
                label="texto" 
                name="texto" 
                variant="outlined" 
                margin="normal"
                multiline
                minRows={5}
                fullWidth />

                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => buscaId(`/temas/${e.target.value}`, setTema, {
                            headers: {"Authorization": token }  
                        })}>
                        {
                            temas.map(tema => (
                                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                            ))
                        }
                    </Select>

                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}
export default CadastroPost;