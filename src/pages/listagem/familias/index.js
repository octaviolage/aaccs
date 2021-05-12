import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PageDefault } from '../../../components/PageDefault';
import { getPokemons } from '../../../api';
import { FamilyCard } from '../../../components/Card/Familia';

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



function ListagemFamilias() {
    const obj = {
        id: ''
    }
    const [familias, setFamilias] = useState([]);
    useEffect(() => {
        getPokemons('familias', obj)
          .then((familias) => {
            setFamilias(familias);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, []);
    
    function handleClick(event) {
        // getPokemons('familias', obj)
        setFamilias(['Texto', 'Outro texto'])
    }
    console.log()
    return (
        <PageDefault >
            <Title > Listagem de famílias </Title>
            {familias.map((familia, indice) => {
                return (
                    <>
                        <FamilyCard
                        nome={familia.nome}
                        contato={familia.contato}
                        endereco={familia.endereco}
                        necessidade={familia.necessidade}
                        imagem={familia.imagemurl}
                        aprovacao={familia.aprovacao}
                        />
                    </>
                )
            })}
            {/* <button handleClick={handleClick}>Clique aqui para mudar</button> */}
        </PageDefault >
    )
}

export { ListagemFamilias };