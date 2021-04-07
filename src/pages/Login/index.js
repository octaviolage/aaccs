import React from 'react';
import styled from 'styled-components';
import { FormField } from '../../components/FormField';
import { Navbar } from '../../components/Navbar';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
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

function Login() {
    const valoresIniciais = {
        email: '',
        password: '',
      };

    const { handleChange, values, clearForm } = useForm(valoresIniciais);
    
    return (
        <Container>
            <Navbar />
            <Title>Login</Title>
            <FormField 
                label="Email"
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
            />
            <FormField 
                label="Senha"
                type="text"
                name="password"
                value={values.password}
                onChange={handleChange}
            />
            <Button>Entrar</Button>
        </Container>
    )
}

export { Login };