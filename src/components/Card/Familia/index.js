import React, { useState } from 'react';
import styled from 'styled-components';
import { approveFamily } from '../../../api';

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

function FamilyCard({ id, nome, contato, endereco, necessidade, aprovacao, imagem }) {
    const [value, setValue] = useState(aprovacao)
    function handleChange() {
        const approv = value ? false : true;
        setValue(approv)
        approveFamily(id, approv)
    }

    return (
    <FamilyCardContainer>
            <p>Solicitante: {nome}</p>
            <p>contato: {contato}</p>
            <p>endereco: {endereco}</p>
            <p>necessidade: {necessidade}</p>
            <p>Aprovado: 
                <input type="checkbox" checked={value} onChange={handleChange}/>
            </p>
        {/* <FamilyCardContainer.Imagem src={imagem} alt={nome}/> */}
    </FamilyCardContainer>
  );
}

export { FamilyCard };
