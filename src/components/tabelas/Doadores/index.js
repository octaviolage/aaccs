import React from 'react';
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
import TransitionsModal from '../../modal/Transition';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import styled from 'styled-components';
import { deletePokemon } from '../../../api';
import { useAuth0 } from "@auth0/auth0-react";

const Button = styled.button`
    width: 150px;
    height: 40px;
    position: relative;
    border-radius: 5px;
    outline: none;
    border: 2px solid ${({ color }) => color? color : '#56CCF2'};
    background-color: ${({ color }) => color? color : '#56CCF2'};
    color: var(--white);
    box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-weight: bold;
    cursor: pointer;
    left: 50%;
    margin: 10px;
    margin-top: 20px;
    transition: opacity 1;

    &:hover,
      &:focus {
        box-shadow: none;
      }
`;

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  header: {
    backgroundColor: 'var(--secondary)',
    color: 'var(--white)',
    fontSize: 16,
  },
});

function createData(id, nome, contato, item_doado) {
  return {
    id,
    nome,
    contato,
    item_doado
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
    const response = await deletePokemon('doadores', id, token)
    console.log(response)
    if (response <= 299){
        window.alert('Familia removida com sucesso')
        document.location.reload()
      }
      else if (response <= 499){
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
        <TableCell>
          <TransitionsModal
            displayName="edit"
          >
            <h3>Deseja excluir este cadastro? </h3>
            <Button color="var(--warning)"  id={row.id} onClick={handleDelete}>Sim, excluir!</Button>
          </TransitionsModal>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Descrição do Item
              </Typography>
              <p>{row.item_doado}</p>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function DonorTable({users, token}) {
  const classes = useRowStyles();
    const rows = [];
    for(let i = 0; i < users.length; i++){
        rows.push(
            createData(
                users[i].identificador,
                users[i].nome,
                users[i].contato,
                users[i].item_doado
            )
        )
    }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead className={classes.header}>
          <TableRow>
            <TableCell />
            <TableCell className={classes.header}>Nome</TableCell>
            <TableCell className={classes.header}>Contato</TableCell>
            <TableCell className={classes.header}>Editar</TableCell>
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
export { DonorTable };
