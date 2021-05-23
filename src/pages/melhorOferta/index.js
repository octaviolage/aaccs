import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Oferta from '../../components/cards/Oferta'
import { PageDefault } from '../../components/PageDefault';
import ofertas from '../../content/ofertas.json';
import { FormField } from '../../components/FormField';
import { useForm } from '../../components/hooks/useForm';

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

const Grid = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fill, minmax(345px, 1fr));
    grid-gap: 30px;
`;

const Container = styled.div`
    margin: 2%;
`;

function MelhorOferta() {

    useEffect(() => {
        const getOffers = async () => {
            // TODO
        }
        getOffers()
    }, []);
    const { handleChange, values } = useForm({filtro: ''});
    const [ resultados, setResultados ] = useState(ofertas)

    function filtrar(event) {
        handleChange(event)
        const filtro = event.target.value.toLowerCase();
        const nome = ofertas.filter(oferta => oferta.nome.toLowerCase().includes(filtro));
        const descricao = ofertas.filter(oferta => oferta.descricao.toLowerCase().includes(filtro));
        const resultado = [...new Set(nome.concat(descricao))];
        setResultados(resultado)
    }
    return (
        <PageDefault>
            <Title>Melhores Ofertas!</Title>
            <FormField label="Buscar"
                    type="text"
                    name="filtro"
                    value={values.filtro}
                    required="True"
                    onChange={filtrar} 
            />
            <br/>
            <Container>

                <Grid>
                    {resultados.map((oferta) => {
                        return (
                            <Oferta 
                            nome={oferta.nome}
                            descricao={oferta.descricao}
                            preco={oferta.preco}
                            imagem={oferta.imagem}
                            url={oferta.url}
                            />
                        )
                    })}
                </Grid>
            </Container>
        </PageDefault>
    )
}

export { MelhorOferta };