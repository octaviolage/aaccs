import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../../../components/Button';
import { useForm } from '../../../components/hooks/useForm';
import { PageDefault } from '../../../components/PageDefault';
import { postPokemons } from '../../../api';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        '& label.Mui-focused': {
            color: 'var(--secondary)',
        },
        '& .MuiFilledInput-underline:after': {
            borderBottomColor: 'var(--secondary)',
        },
    },
    mobile: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '95%',
        },
    },
    fullField: {
        display: 'flex',
        width: '80vw',
        margin: 'auto',
        justifyContent: 'space-between',
    },
    halfField: {
        display: 'inline-flex',
        width: '35vw'
    },
    thirdField: {
        display: 'inline-flex',
        width: '35vw',
        marginLeft: '5.4%',
    },
}));

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

    
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:800px)');

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
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    
    return (
        <PageDefault>
            <Title>Cadastro doação</Title>
            <Form onSubmit={handleSubmit} className={matches ? classes.root : null}>
                <TextField className={matches ? classes.fullField : null}
                    required
                    label="Nome"
                    variant="filled"
                    onChange={handleChange}
                    name="nome"
                /> 
                <br />
                <TextField className={matches ? classes.thirdField : null}
                    required
                    label="Contato"
                    variant="filled"
                    onChange={handleChange}
                    name="contato"
                /> 
                <br /> <br />
                <TextField className={matches ? classes.fullField : null}
                    required
                    label="Descrição do item ou itens a serem doados"
                    multiline
                    rows={4}
                    variant="filled"
                    onChange={handleChange}
                    name="item"
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