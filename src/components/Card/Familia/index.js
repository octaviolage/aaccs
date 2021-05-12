import React from 'react';
import styled from 'styled-components';

const FamilyCardContainer = styled.div`
    width: 90%;
    height: fit-content;
    border-radius: 10px;
    border: 2px solid var(--primary);
    margin: auto;
    margin-top: 15px;
    margin-bottom: 15px;
    padding-left: 3%;
`;

FamilyCardContainer.Imagem = styled.img`
    max-height:300px;
    max-width: 50%;
    justify-content: center;
    float: right;
`;

function FamilyCard({ nome, contato, endereco, necessidade, aprovacao, imagem }) {
    aprovacao = aprovacao !== true ? false: true;
    return (
    <FamilyCardContainer>
            <p>nome: {nome}</p>
            <p>contato: {contato}</p>
            <p>endereco: {endereco}</p>
            <p>necessidade: {necessidade}</p>
            <p>Aprovado: <input type="checkbox" checked={aprovacao}></input></p>
        {/* <FamilyCardContainer.Imagem src={imagem} alt={nome}/> */}
    </FamilyCardContainer>
  );
}

export { FamilyCard };
