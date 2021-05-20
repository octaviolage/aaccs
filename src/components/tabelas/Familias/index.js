import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import styled from 'styled-components';
import { deletePokemon } from '../../../api';
import { useAuth0 } from "@auth0/auth0-react";

const Image = styled.img`
    width: 90%;
    margin: auto;
`;

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(id, nome, contato, endereco, necessidade, aprovacao, imagemurl) {
  return {
    id,
    nome,
    contato,
    endereco,
    necessidade,
    aprovacao,
    imagemurl,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = React.useState();
  const { getAccessTokenSilently } = useAuth0();
  const classes = useRowStyles();

  React.useEffect( () => {
    const fetchToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://aaccs-portal.us.auth0.com/api/v2/`,
          scope: "read:current_user",
        })
        setToken(accessToken)
      }
      catch {
        console.log('Necessário estar logado')
      }
    }
    fetchToken();
  }, [getAccessTokenSilently]);

  async function handleDelete(event){
    const id = event.target.id
    const response = await deletePokemon('familias', id, token)
    console.log(response)
    if (response <= 299){
      window.alert('Familia removida com sucesso')
      document.location.reload()
    }
    else if (400 <= response <= 499){
      window.alert('Tem algo errado. Você esta logado?')
    }
    else {
      window.alert('Parece que temos um probleminha por aqui...')
    }
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.nome}
        </TableCell>
        <TableCell>{row.contato}</TableCell>
        <TableCell>{row.aprovacao === null ? 'Pendente' : row.aprovacao === true ? 'Aprovado' : 'Reprovado'}</TableCell>
        <TableCell><button id={row.id} onClick={handleDelete}>apagar</button></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Dados adicionais
              </Typography>
              <p><b>Endereço:</b> {row.endereco}</p>
              <p><b>Necessidade:</b> {row.necessidade}</p>
              {row.imagemurl ? <Image src={row.imagemurl} alt={row.nome}/> : null}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export function FamilyTable({users, token}) {
  const [familias, setFamilias] = useState([])
  const rows = [];
  for(let i = 0; i < users.length; i++){
        rows.push(
            createData(
                users[i].identificador,
                users[i].nome,
                users[i].contato,
                users[i].endereco,
                users[i].necessidade,
                users[i].aprovacao,
                users[i].imagemurl,
            )
        )
    }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nome</TableCell>
            <TableCell >Contato</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} token={token}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default  { FamilyTable };
