import { token } from './token.json';
import axios from 'axios';

const BASE_URL = "http://melhor-oferta.herokuapp.com/api";

export async function getPokemons(tabela, id = '') {
    const pokemons = await fetch(`${BASE_URL}/${tabela}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((respostaDoServer) => {
            if (respostaDoServer.ok) {
                return respostaDoServer.json();
            }
            throw new Error('Deu problema na pokedex');
        })
    return pokemons;
}

export async function postPokemons(tabela, obj) {
    await axios.post(`${BASE_URL}/${tabela}`, obj)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else
                console.log('Erro de comunicação com a API')
                console.log(response)
        })
}

export async function approveFamily(id, value) {
    await fetch(`${BASE_URL}/familias/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                'aprovacao': value
            }
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else
                console.log('Erro de comunicação com a API')
                console.log(response)
        })
}
