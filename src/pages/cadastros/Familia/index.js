import React from 'react';
import styled from 'styled-components';
import { FormField } from '../../components/FormField';
import { Button } from '../../components/Button';
import { useForm } from '../../components/hooks/useForm';
import { PageDefault } from '../../components/PageDefault';

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

function Login() {
    const valoresIniciais = {
        email: '',
        password: '',
      };

    const { handleChange, values, clearForm } = useForm(valoresIniciais);

    function handleSubmit(event) {
        event.preventDefault();
        console.log(event)
        //TODO: Calls login function
        clearForm();
    }
    
    return (
        <PageDefault>
            <Title>Login</Title>
            <Form onSubmit={handleSubmit}>
                <FormField 
                    label="Email"
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                />
                <FormField 
                    label="Senha"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                />

                <Button type="submit">
                    Entrar
                </Button>
            </Form>
        </PageDefault>
    )
}

export { Login };