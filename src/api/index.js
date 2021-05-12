import { token } from './token.json';
import axios from 'axios';

const BASE_URL = "https://melhor-oferta.herokuapp.com/api";

export async function getPokemons(tabela, obj) {
    const pokemons = await fetch(`${BASE_URL}/${tabela}/${obj.id}`, {
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

// export async function postPokemons(tabela, obj) {
//     console.log(obj)
//     await fetch(`${BASE_URL}/${tabela}`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json;charset=UTF-8'
//             },
//             body: {
//                 nome: 'Leticia',
//                 contato: '99143-7309',
//                 endereco: 'Rua 18',
//                 necessidade: 'Cesta básica',
//             }
//         })
//         .then((response) => {
//             if (response.ok) {
//                 return response.json();
//             }
//             else
//                 console.log('Erro de comunicação com a API')
//                 console.log(response)
//         })
// }

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