import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../../components/Button';
import { PageDefault } from '../../../components/PageDefault';
import { postPokemons } from '../../../api';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
        '& label.Mui-focused': {
            color: 'var(--secondary)',
        },
        '& .MuiFilledInput-underline:after': {
            borderBottomColor: 'var(--secondary)',
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

const FileField = styled.input`
    display: flex;
    margin: auto;
    margin-bottom: 5%;
`;


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
    margin-left: 5.4%;
    @media(max-width: 800px) {
        margin-left: 5%;
    }
`;

const estados = [
    { value: '', label: 'Selecione' },
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' },
];

function CadastroFamilia() {
    const valoresIniciais = {
        nome: '',
        telefone: '',
        email: '',
        pessoas: '',
        endereco: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        necessidade: '',
        imagem: ''
    };
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:800px)');

    const [values, setValues] = useState(valoresIniciais);
    const [cidades, setCidades] = useState([]);

    async function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        values[name] = value;
        setValues(values)
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const obj = {
            nome: values.nome,
            familiares: values.pessoas,
            contato: `${values.telefone}|${values.email}`,
            necessidade: values.necessidade,
            endereco: `${values.endereco}|${values.numero}`,
            bairro: values.bairro,
            cidade: values.cidade,
            estado: values.estado,
        }
        if (values.imagem.length > 0)
            obj.imagem = values.imagem
        await postPokemons('familias', obj);
    }

    function getBase64(event) {
        handleChange(event);
        const file = event.target.files[0];
        if (file) {
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => values.imagem = reader.result;
                reader.onerror = error => reject(error);
            });
        }
    };

    async function getMunicipios(event) {
        const value = event.target.value;
        values.estado = value;
        values.cidade = '';
        const fetchIBGE = fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${value}/municipios`);

        fetchIBGE.then(response => {
            return response.json()
        }).then(municipios => {
            const cidades = []
            municipios.forEach(municipio => {
                cidades.push({ value: municipio.id, label: municipio.nome })
            });
            setCidades(cidades);

        })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <PageDefault >
            <Title > Cadastro familiar </Title>
            <SubTitle > Dados pessoais </SubTitle>
            <Form onSubmit={handleSubmit} className={matches ? classes.root : classes.mobile} noValidate autoComplete="off">
                <TextField className={matches ? classes.fullField : null}
                    required
                    label="Nome"
                    variant="filled"
                    onChange={handleChange}
                    name="nome"
                /> <br />
                <div className={matches ? classes.fullField : null}>
                    <TextField className={classes.halfField}
                        required
                        label="Telefone"
                        variant="filled"
                        onChange={handleChange}
                        name="telefone"
                    />
                    <TextField className={classes.halfField}
                        required
                        label="Email"
                        variant="filled"
                        onChange={handleChange}
                        name="email"
                        type="email"
                    />
                </div> <br />
                <TextField className={classes.thirdField}
                    required
                    label="Quantas pessoas moram com você"
                    type="number"
                    variant="filled"
                    onChange={handleChange}
                    name="pessoas"
                />
                <SubTitle > Endereço </SubTitle>
                <div className={matches ? classes.fullField : null}>
                    <TextField className={classes.halfField}
                        required
                        select
                        label="Estado"
                        value={values.estado}
                        onChange={getMunicipios}
                        variant="filled"
                        name="estado"
                    >
                        {estados.map((estado) => (
                            <MenuItem key={estado.value} value={estado.value}>
                                {estado.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField className={classes.halfField}
                        required
                        select
                        label="Cidade"
                        value={values.cidade}
                        onChange={handleChange}
                        variant="filled"
                        name="cidade"
                    >
                        {cidades.map((cidade) => (
                            <MenuItem key={cidade.value} value={cidade.label}>
                                {cidade.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <br />
                <TextField className={matches ? classes.fullField : null}
                    required
                    label="Bairro"
                    variant="filled"
                    onChange={handleChange}
                    name="bairro"
                /> <br />
                <div className={matches ? classes.fullField : null}>
                    <TextField className={classes.halfField}
                        required
                        label="Endereço"
                        variant="filled"
                        onChange={handleChange}
                        name="endereco"
                    />
                    <TextField className={classes.halfField}
                        required
                        label="Número"
                        variant="filled"
                        onChange={handleChange}
                        name="numero"
                    />
                </div>
                <br />
                <SubTitle > Sobre você </SubTitle>
                <TextField className={matches ? classes.fullField : null}
                    required
                    label="Necessidade"
                    multiline
                    rows={4}
                    variant="filled"
                    onChange={handleChange}
                    name="necessidade"
                />
                <Texto>* campos obrigatórios</Texto>
                <SubTitle > Envie uma foto da sua família ou situação(opcional) </SubTitle>
                <FileField type="file"
                    name="imagem"
                    onChange={getBase64}
                    accept="image/*"
                /> <br />
                <Button type="submit" > Enviar </Button>
            </Form>
        </PageDefault >
    )
}

export { CadastroFamilia };