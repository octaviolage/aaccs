import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useAuth0 } from "@auth0/auth0-react";
import { PageDefault } from '../../../components/PageDefault';
import { getPokemons, exportPokemons } from '../../../api';
import { DonorTable } from '../../../components/tabelas/Doadores';

const Button = styled.button`
  width: 150px;
  height: 40px;
  position: relative;
  border-radius: 5px;
  outline: none;
  border: 2px solid var(--primary);
  background-color: var(--primary);
  color: var(--white);
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-weight: bold;
  cursor: pointer;
  left: 50%;
  margin-top: 20px;
  transition: opacity 1;

  &:hover,
    &:focus {
      box-shadow: none;
    }
`;
const Title = styled.h1`
    position: relative;
    display: block;
    margin-top: 100px;
    margin-bottom: 3%;
    text-align: center;
    font-weight: bold;
    font-size: 36px;
    color: var(--secondary);

    @media(max-width: 800px) {
      display: block;
      justify-content: center;
    }
`;

const TableWrapper = styled.div`
    width: 90%;
    margin: auto;
    @media(max-width: 800px) {
      width: 98%;
    }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      minWidth: '100%',
    },
    '& label.Mui-focused': {
      color: 'var(--secondary)',
    },
    '& .MuiFilledInput-underline:after': {
      borderBottomColor: 'var(--secondary)',
  },
  },
}));

function ListagemDoadores() {
  const classes = useStyles();

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [doadores, setDoadores] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [token, setToken] = useState([]);
  const [filtro, setFiltro ] = useState({name: ""});

  async function handleExport() {
    await exportPokemons('doadores', token)
  }

  const handleChange = (event) => {
    filtro.name = event.target.value.toLowerCase();
    setFiltro(filtro)
    const resultado = doadores.filter(doadore => doadore.nome.toLowerCase().includes(filtro.name));
    setResultados(resultado)
  }

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://aaccs-portal.us.auth0.com/api/v2/`,
          scope: "read:current_user",
        })
        const doadores = await getPokemons('doadores', accessToken)
        setToken(accessToken)
        setDoadores(doadores);
        setResultados(doadores);
      }
      catch {
        window.alert('Faça login antes!');
        return window.location.replace('/')
      }
    }
    fetchToken()
  }, [getAccessTokenSilently]);

  if (!isAuthenticated){
    return <p>Carregando...</p>
  }

  return (
    <PageDefault >
      <Title > Listagem de doadores </Title>
      <TableWrapper>
      <form className={classes.root} noValidate autoComplete="off">
          <div>
            <div>Filtros</div>
            <TextField  className={classes.root}
              id="filled-basic" 
              label="Nome" 
              variant="filled" 
              onChange={handleChange}
              name="name"
            />
          </div>
          <br/>
      </form>
        <DonorTable users={resultados} />
      </TableWrapper>
      <br /><br />
      <Button onClick={handleExport} >Exportar dados</Button>
    </PageDefault >
  )
}

export { ListagemDoadores };