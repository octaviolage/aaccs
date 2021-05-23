import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";
import { PageDefault } from '../../components/PageDefault';
import { useForm } from '../../components/hooks/useForm';
import { FormField } from '../../components/FormField';
import { Button } from '../../components/Button';
import content from '../../content/inicio.json';

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

const SubTitle = styled.h3`
  margin-top: 5%;
  margin-left: 5%;
  font-weight: normal;
  font-size: 18px;
  color: var(--secondary);

  @media(max-width: 800px) {
    display: block;
    justify-content: center;
    margin-top: 10%;
  }
`;

const Form = styled.form`
    align-items: center;
    align-content: center;
    align-self: auto;
`;

function Configuracao() {
    const valoresIniciais = {
        nome: content['nome'],
        slogan: content['slogan'],
        tituloI: content['tituloI'],
        textoI: content['textoI'],
      };
      const { isAuthenticated } = useAuth0();
    const { handleChange, values } = useForm(valoresIniciais);
    
    function saveToFile(event) {
        event.preventDefault();
        console.log(values)
        // const jsonObject = JSON.stringify(values);
        // const blob = new Blob([jsonObject], {type: JSON});
        // saveAs(blob, '../../content/inicio2.json', {type: 'application/JSON;charset=utf-8'});
    }
    
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    if (!isAuthenticated){
        return (
            <Redirect to="/" />
        )
    }
    return (
        <PageDefault>
            <Title>Configurações</Title>
            <SubTitle>Principal</SubTitle>
            <Form onSubmit={saveToFile}>
                <FormField 
                    label="Nome da página"
                    type="text"
                    name="nome"
                    value={values.nome}
                    required="True"
                    onChange={handleChange}
                />
                <FormField 
                    label="Slogan"
                    type="text"
                    name="slogan"
                    value={values.slogan}
                    required="True"
                    onChange={handleChange}
                />
                <SubTitle>Bloco I</SubTitle>
                <FormField 
                    label="Titulo"
                    type="text"
                    name="tituloI"
                    position="reduced"
                    value={values.tituloI}
                    required="True"
                    onChange={handleChange}
                />
                <FormField 
                    label="Texto"
                    type="textarea"
                    name="textoI"
                    position="textarea"
                    value={values.textoI}
                    required="True"
                    onChange={handleChange}
                />
                <br />
                <Button type="submit">
                    Enviar
                </Button>
            </Form>

        </PageDefault>
    )
}

export { Configuracao };