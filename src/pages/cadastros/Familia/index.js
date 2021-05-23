import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FormField } from '../../../components/FormField';
import { FileField } from '../../../components/FileField';
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

const Texto = styled.p`
    margin-left: 10%;
    @media(max-width: 800px) {
        margin-left: 5%;
    }
`;

function CadastroFamilia() {
    const valoresIniciais = {
        nome: '',
        telefone: '',
        email: '',
        pessoas: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        necessidade: '',
        imagem: ''
    };

    const { handleChange, values, clearForm } = useForm(valoresIniciais);
    const [imageBase64, setImage] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const obj = {
            imagem: imageBase64,
            nome: values.nome,
            contato: `${values.telefone};${values.email}`,
            necessidade: values.necessidade,
            endereco: `${values.logradouro}, ${values.numero}, ${values.bairro}, ${values.cidade}, ${values.estado}`,
        }
        console.log(obj)
        await postPokemons('familias', obj)
        clearForm(valoresIniciais);
    }

    function getBase64(event) {
        handleChange(event)
        const file = event.target.files[0]
        setImage(file)
        if (file) {
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => setImage(reader.result);
                reader.onerror = error => reject(error);
            });
        }
    };

    
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <PageDefault >
            <Title > Cadastro familiar </Title>
            <SubTitle > Dados pessoais </SubTitle>
            <Form onSubmit={handleSubmit} >
                <FormField label="Seu nome*"
                    type="text"
                    name="nome"
                    value={values.nome}
                    required="True"
                    onChange={handleChange} />
                <FormField label="Telefone*"
                    type="text"
                    name="telefone"
                    position="reduced"
                    value={values.telefone}
                    required="True"
                    onChange={handleChange}
                />
                <FormField label="Email"
                    type="email"
                    name="email"
                    position="reduced"
                    value={values.email}
                    onChange={handleChange}
                />
                <FormField label="Quantas pessoas moram com você*"
                    type="number"
                    name="pessoas"
                    position="reduced"
                    value={values.pessoas}
                    required="True"
                    onChange={handleChange}
                /> <SubTitle > Endereço </SubTitle>
                <FormField label="Logradouro"
                    type="text"
                    name="logradouro"
                    value={values.logradouro}
                    onChange={handleChange}
                />
                <FormField label="Numero"
                    type="text"
                    name="numero"
                    position="reduced"
                    value={values.numero}
                    onChange={handleChange}
                />
                <FormField label="Bairro"
                    type="text"
                    name="bairro"
                    value={values.bairro}
                    onChange={handleChange}
                />
                <FormField label="Cidade"
                    type="text"
                    name="cidade"
                    value={values.cidade}
                    onChange={handleChange}
                />
                <FormField label="Estado"
                    type="text"
                    name="estado"
                    position="reduced"
                    value={values.estado}
                    onChange={handleChange}
                />
                <FormField label="Necessidade*"
                    type="textarea"
                    name="necessidade"
                    position="textarea"
                    value={values.necessidade}
                    required="True"
                    onChange={handleChange}
                />
                <Texto>* campos obrigatórios</Texto>
                <SubTitle > Envie uma foto da sua família ou situação(opcional) </SubTitle>
                <FileField type="file"
                    name="imagem"
                    value={values.imagem}
                    onChange={getBase64}
                    accept="image/*"
                /> <br />
                <Button type="submit"> Enviar </Button>
            </Form>
        </PageDefault >
    )
}

export { CadastroFamilia };