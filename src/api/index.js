import { token } from './token.json';
import axios from 'axios';

const URL_BASE = "https://melhor-oferta.herokuapp.com/api";

export async function getPokemons(tabela, id = '', url = URL_BASE) {
    const pokemons = await fetch(`${url}/${tabela}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                console.log('Erro de comunicação com a API')
                console.log(response)
            }
        })
        return pokemons;
    }
    
    
    
    export async function postPokemons(tabela, obj) {
        await axios.post(`${URL_BASE}/${tabela}`, obj)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                console.log('Erro de comunicação com a API')
                console.log(response)
            }
        })
    }
    
    export async function approveFamily(id, value, url = URL_BASE){
        await axios.patch(
            `${url}/familias/${id}`, 
            { aprovacao: value},
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
            )
            .then((response) => {
                if (response.status === 200) {
                    return response;
                }
                else {
                    console.log('Erro de comunicação com a API')
                    console.log(response)
                }
        })
}
