import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";
import { PageDefault } from '../../../components/PageDefault';
import { getPokemons, exportPokemons } from '../../../api';
import { DonorTable } from '../../../components/tabelas/Doadores';

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

function ListagemDoadores() {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [doadores, setDoadores] = useState([]);
  const [token, setToken] = useState([]);

  async function handleExport() {
    await exportPokemons('doadores', token)
  }

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://aaccs-portal.us.auth0.com/api/v2/`,
          scope: "read:current_user",
        })
        const doadores = await getPokemons('doadores', accessToken)
        // console.log(accessToken)
        setToken(accessToken)
        setDoadores(doadores);
      }
      catch {
        return window.alert('Faça login antes!')
      }
    }
    fetchToken()
  }, [getAccessTokenSilently]);

  // if(!isAuthenticated) {
  //   return <Redirect to="/" />
  // }

  return (
    <PageDefault >
      <Title > Listagem de famílias </Title>
      <TableWrapper>
        <DonorTable users={doadores} />
      </TableWrapper>
      <br /><br />
      <button onClick={handleExport} >Exportar dados</button>
    </PageDefault >
  )
}

export { ListagemDoadores };