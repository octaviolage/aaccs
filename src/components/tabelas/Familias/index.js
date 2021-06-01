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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import styled from 'styled-components';
import { approveFamily, deletePokemon } from '../../../api';
import { useAuth0 } from "@auth0/auth0-react";
import TransitionsModal from '../../modal/Transition';
import TablePagination from '@material-ui/core/TablePagination';

const Image = styled.img`
    width: 90%;
    display: block;
    margin: auto;
    border-radius: 5px;
    max-height: 600px;
`;

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

const ContainerButtons = styled.div`
  max-width: 95%;
  width: 600px;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 5px;

  @media(max-width: 800px) {
    width: 100%;
  }
`;

const Aprovado = styled.p`
  color: green;
  font-size: 12;
`
const Reprovado = styled.p`
  color: red;
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

function createData(id, nome, contato, endereco, bairro, cidade, estado, necessidade, aprovacao, imagemurl, familiares) {
  return {
    id,
    nome,
    contato,
    endereco,
    bairro,
    cidade,
    estado,
    necessidade,
    aprovacao,
    imagemurl,
    familiares,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = React.useState();
  const { getAccessTokenSilently } = useAuth0();
  const classes = useRowStyles();

  React.useEffect(() => {
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

  async function handleDelete(event) {
    const id = event.target.id
    await deletePokemon('familias', id, token)
  }

  async function handleApprove(event) {
    const id = event.target.id;
    const value = event.target.name;
    return value.toString().includes(row.aprovacao) ? window.alert('Já é o status atual') : await approveFamily(id, value, token);
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
        <TableCell>
          Telefone: {row.contato.split('|')[0]}
          <br/>
          Email: {row.contato.split('|')[1]}
        </TableCell>
        <TableCell>
          {
            row.aprovacao === null ? 'Pendente' 
            : row.aprovacao === true ? <Aprovado>Aprovado</Aprovado> 
            : <Reprovado>Reprovado</Reprovado>
          }
        </TableCell>
        <TableCell>
          <TransitionsModal
            displayName="edit"
          >
            <h3>O que deseja editar no cadastro?</h3>
            <ContainerButtons>
              <Button id={row.id} name="true" onClick={handleApprove}>Aprovar</Button>
              <Button id={row.id} name="false" onClick={handleApprove}>Reprovar</Button>
              <TransitionsModal displayName="delete" color="var(--warning)">
                <h3>Tem certeza que deseja excluir esta família?</h3>
                <Button color="var(--warning)" id={row.id} onClick={handleDelete}>Sim, excluir!</Button>
              </TransitionsModal>
            </ContainerButtons>
          </TransitionsModal>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Dados adicionais
              </Typography>
              <div>
                <p><b>Quantidade de pessoas na família:</b> {row.familiares}</p>
                <p><b>Endereço:</b> {row.endereco.replace('|', ', ')} &nbsp;&nbsp; <b>Bairro:</b> {row.bairro}</p>
                <p><b>Cidade:</b> {row.cidade} &nbsp;&nbsp; <b>Estado:</b> {row.estado}</p>
                <p><b>Necessidade:</b> {row.necessidade}</p>
              </div>
              {row.imagemurl ? <Image src={row.imagemurl} alt={row.nome} /> : null}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function FamilyTable({ users, token }) {
  let rows = [];
  const classes = useRowStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const sortedList = users.sort( (a, b) => {
    return a.aprovacao === null ? -1 : 1;
  })

  for (let i = 0; i < sortedList.length; i++) {
    rows.push(
      createData(
        users[i].identificador,
        users[i].nome,
        users[i].contato,
        users[i].endereco,
        users[i].bairro,
        users[i].cidade,
        users[i].estado,
        users[i].necessidade,
        users[i].aprovacao,
        users[i].imagemurl,
        users[i].familiares,
      )
    )
  }
  

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead className={classes.header}>
          <TableRow >
            <TableCell />
            <TableCell className={classes.header}>Nome</TableCell>
            <TableCell className={classes.header}>Contato</TableCell>
            <TableCell className={classes.header}>Status</TableCell>
            <TableCell className={classes.header}>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, key) => (
            <Row key={key} row={row} token={token} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
export { FamilyTable };
