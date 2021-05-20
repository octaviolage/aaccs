import React from 'react';
import styled from 'styled-components';
import { FormField } from '../../../components/FormField';
import { Button } from '../../../components/Button';
import { useForm } from '../../../components/hooks/useForm';
import { PageDefault } from '../../../components/PageDefault';
import { postPokemons } from '../../../api';

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

const Form = styled.form`
    align-items: center;
    align-content: center;
    align-self: auto;
`;

function CadastroDoacao() {
    const valoresIniciais = {
        nome: '',
        contato: '',
        item: '',
      };

    const { handleChange, values, clearForm } = useForm(valoresIniciais);

    function handleSubmit(event) {
        event.preventDefault();
        const obj = {
            nome: values.nome,
            contato: values.contato,
            item_doado: values.item,
        }
        postPokemons('doadores', obj)
        clearForm();
    }
    
    return (
        <PageDefault>
            <Title>Cadastro doação</Title>
            <Form onSubmit={handleSubmit}>
                <FormField 
                    label="Seu nome"
                    type="text"
                    name="nome"
                    value={values.nome}
                    required="True"
                    onChange={handleChange}
                />
                <FormField 
                    label="Contato (telefone/e-mail)"
                    type="text"
                    name="contato"
                    position="reduced"
                    value={values.contato}
                    required="True"
                    onChange={handleChange}
                />
                <FormField 
                    label="Item"
                    type="textarea"
                    name="item"
                    position="textarea"
                    value={values.item}
                    required="True"
                    onChange={handleChange}
                />
                <br />
                <Button type="submit" onClick={handleSubmit}>
                    Enviar
                </Button>
            </Form>
        </PageDefault>
    )
}

export { CadastroDoacao };