import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Oferta from '../../components/cards/Oferta'
import { PageDefault } from '../../components/PageDefault';
import { FormField } from '../../components/FormField';
import { useForm } from '../../components/hooks/useForm';
import { getOfertas } from '../../api';

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
    
    const [ ofertas, setOfertas ] = useState([])
    const [ resultados, setResultados ] = useState([])
    
    useEffect(() => {
        const fetchToken = async () => {
            const response = await getOfertas();
            setOfertas(response)
            setResultados(response)
        }
        fetchToken();
      }, []);
    const { handleChange, values } = useForm({filtro: ''});

    function filtrar(event) {
        handleChange(event)
        const filtro = event.target.value.toLowerCase();
        const produto = ofertas.filter(oferta => oferta.produto.toLowerCase().includes(filtro));
        const origem = ofertas.filter(oferta => oferta.origem.toLowerCase().includes(filtro));
        const resultado = [...new Set(produto.concat(origem))];
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
                            nome={oferta.produto}
                            descricao={oferta.origem}
                            preco={oferta.preco}
                            url={oferta.link}
                            />
                        )
                    })}
                </Grid>
            </Container>
        </PageDefault>
    )
}

export { MelhorOferta };