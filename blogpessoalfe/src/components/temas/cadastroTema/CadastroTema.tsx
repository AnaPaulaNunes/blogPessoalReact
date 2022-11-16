import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import Tema from '../../../models/Tema';
import { buscaId, post, put } from '../../../services/Service';
import { useNavigate, useParams } from 'react-router-dom';
//import useLocalStorage from 'react-use-localstorage';
import "./CadastroTema.css"
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';


function CadastroTema() {

    let navigate = useNavigate();

    const { id } = useParams<{id: string}>();

    //const [token, setToken] = useLocalStorage("token");

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ""
    });

    useEffect(() => {
        if(token == "") {
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
            navigate("/login")
        }
    }, [token]);

    useEffect(() => {
        if(id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/temas/${id}`, setTema, {
            headers: { Authorization: token }
        })
    }

    function updateTema(event: ChangeEvent<HTMLInputElement>){
        setTema({
            ...tema,
        [event.target.name]: event.target.value
        })
    }

    async function cadastrar(event: ChangeEvent<HTMLFormElement>) {
        if(id !== undefined) {
            put(`/temas`, tema, setTema, {
                headers: {Authorization: token }
            })
            toast.success("Tema atualizado com sucesso!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            })
    } else {
        post(`/temas`, tema, setTema, {
            headers: {Authorization: token }
    })
    toast.success("Tema cadastrado com sucesso!", {
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
back()

    }

    function back() {
        navigate("/temas")
    }
    

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={cadastrar}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >
                    Formulário de cadastro tema
                </Typography>
                
                <TextField 
                id="descricao" 
                value={tema.descricao}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateTema(event)}
                label="descricao" 
                variant="outlined" 
                name="descricao" 
                margin="normal" 
                fullWidth />

                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default CadastroTema;