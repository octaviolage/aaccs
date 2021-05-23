import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
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

function ListagemFamilias() {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [familias, setFamilias] = useState([]);
  const [token, setToken] = useState([]);

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
        setToken(accessToken)
        setFamilias(familias);
      }
      catch {
        return window.alert('Faça login antes!')
      }
    }
    fetchToken()
  }, [getAccessTokenSilently]);

  if(!isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <PageDefault >
      <Title > Listagem de famílias </Title>
      <TableWrapper>
        <FamilyTable users={familias} />
      </TableWrapper>
      <br /><br />
      <Button onClick={handleExport} >Exportar dados</Button>
    </PageDefault >
  )
}

export { ListagemFamilias };