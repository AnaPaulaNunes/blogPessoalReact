import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import './ListaTema.css';
import { Box } from '@mui/material';
import Tema from '../../../models/Tema';
//import useLocalStorage from 'react-use-localstorage';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function ListaTema() {

    //constante que vai armazenar os temas do backend 
    const [temas, setTemas] = useState<Tema[]>([]);
    //const [token, setToken] = useLocalStorage("token");
    let navigate = useNavigate();
    //constante que vai acessar o meu token
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )

    useEffect(() => {
        if(token == ""){
            toast.error("Você precisa estar logado!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            })
            navigate("/login");
        }
    }, [token])

    //função que vai solicitar o tema do backend 
    async function buscaTema(){
        await busca("/temas", setTemas, {
            headers: { 'Authorization': token },
        })
    }

    // vai rodar assim que a tela for aberta pelo usuario
    useEffect(() =>{
        buscaTema()
    }, [temas.length])

return (
    <>
    {/* o map irá percorrer o array de temas e gerar um card novo para cada tema existente*/}
    { temas.map(tema => (
    <Box m={2} >
        <Card variant="outlined">
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Tema
                </Typography>

                <Typography variant="h5" component="h2">
                    {tema.descricao}
                </Typography>
            </CardContent>

                <CardActions>
                    <Box display="flex" justifyContent="center" mb={1.5} >
                        <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
                        <Box mx={1}>
                        <Button variant="contained" className="marginLeft" size='small' color="primary" >
                            Atualizar
                        </Button>
                        </Box>
                        </Link>

                        <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
                        <Box mx={1}>
                        <Button variant="contained" size='small' color="secondary">
                            Deletar
                        </Button>
                        </Box>
                        </Link>
                    </Box>
                </CardActions>
        </Card>
    </Box>
    ))
    }
    </>
    )
}


export default ListaTema;