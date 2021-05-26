import React from 'react';
import styled from 'styled-components';
import parceiros from '../../content/parceiros.json';

const Grid = styled.div`
    margin-top: 5%;
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 30px;
`;

const Imagem = styled.img`
    display: block;
    position: 'relative';
    margin: auto;
    width: 200px;
    border-radius: 5px;
`;

const Nome = styled.h4`
    display: block;
    position: 'relative';
    margin: auto;
    text-align: center;
    padding-top: 5px;
    color: var(--grayDark);
`;

function Parceiros() {
    const imgDefault = 'https://www.biotecdermo.com.br/wp-content/uploads/2016/10/sem-imagem-10.jpg';
    
    return (
        <Grid>
            {parceiros.map((parceiro, key) => {
                return (
                    <a href={parceiro.url} key={key}>
                        <Imagem alt={parceiro.nome} src={parceiro.imagem ? parceiro.imagem : imgDefault}/>
                        <Nome>{parceiro.nome}</Nome>
                    </a>
                )
            })}
        </Grid>
    )
}

export { Parceiros };