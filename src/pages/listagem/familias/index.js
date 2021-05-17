import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PageDefault } from '../../../components/PageDefault';
import { FamilyCard } from '../../../components/Card/Familia';
import { getPokemons } from '../../../api';

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
    
    const [familias, setFamilias] = useState([]);
    useEffect(() => {
        getPokemons('familias')
          .then((familias) => {
            setFamilias(familias);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, []);
    
    return (
        <PageDefault >
            <Title > Listagem de famílias </Title>
            {familias.map((familia) => {
                return (
                    <>
                        <FamilyCard
                        id={familia.identificador}
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
            
        </PageDefault >
    )
}

export { ListagemFamilias };