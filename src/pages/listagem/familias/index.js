import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";
import { PageDefault } from '../../../components/PageDefault';
import { getPokemons, exportPokemons } from '../../../api';
import { FamilyTable } from '../../../components/tabelas/Familias';

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

const options = [
  { value: 'all', label: 'Todos' },
  { value: true, label: 'Aprovado'},
  { value: 'null', label: 'Pendente'},
  { value: false, label: 'Reprovado'}
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      minWidth: '25%',
    },
    '& label.Mui-focused': {
      color: 'var(--secondary)',
    },
    '& .MuiFilledInput-underline:after': {
      borderBottomColor: 'var(--secondary)',
  },
  },
  name: {
    width: '70%',
    marginRight: '5%',
  }
}));

function ListagemFamilias() {
  const classes = useStyles();
  const initialvalues = {
    name: '',
    status: 'all'
  }
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [familias, setFamilias] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [token, setToken] = useState([]);
  const [filtros, setFiltros ] = useState(initialvalues);

  async function handleExport() {
    await exportPokemons('familias', token)
  }

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://aaccs-portal.us.auth0.com/api/v2/`,
          scope: "read:current_user",
        })
        const familias = await getPokemons('familias', accessToken)
        setToken(accessToken);
        setFamilias(familias);
        setResultados(familias);
      }
      catch {
        window.alert('Faça login antes!');
        return window.location.replace('/')
      }
    }
    fetchToken()
  }, [getAccessTokenSilently]);

  if (!isAuthenticated) {
    return <p>Carregando...</p>
  }

  const handleChange = (event) => {
    const filtro = filtros
    if (event.target.name === 'select') {
      filtro.status = event.target.value;
      setFiltros(filtro);
    }
    else if (event.target.name === 'name'){
      filtro.name = event.target.value.toLowerCase();
      setFiltros(filtro);
    }
    const resultado = familias.filter(familia => familia.nome.toLowerCase().includes(filtros.name));

    if (filtros.status === 'null') 
      setResultados(resultado.filter(familia => familia.aprovacao === null));
    else if (filtros.status !== 'all') 
      setResultados(resultado.filter(familia => familia.aprovacao === filtros.status));
    else 
      setResultados(resultado);
  }

  return (
    <PageDefault >
      <Title > Listagem de famílias </Title>

      <TableWrapper>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <div>Filtros</div>
            <TextField  className={classes.name}
              id="filled-basic" 
              label="Nome" 
              variant="filled" 
              onChange={handleChange}
              name="name"
            />
            <TextField
              id="standard-select-currency"
              select
              label="Status"
              value={filtros.status}
              onChange={handleChange}
              helperText="Filtre o status da família"
              variant="filled"
              name="select"
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </form>
        <FamilyTable users={resultados} />
      </TableWrapper>
      <br /><br />
      <Button onClick={handleExport} >Exportar dados</Button>
    </PageDefault >
  )
}

export { ListagemFamilias };