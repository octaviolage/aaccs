
import axios from 'axios';

const URL_BASE = "https://melhor-oferta.herokuapp.com/api";

export async function getPokemons(table, token, id = '') {
    const pokemons = await fetch(`${URL_BASE}/${table}/${id}`, {
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
                return response.status;
            }
        })
    return pokemons;
}

export async function postPokemons(table, obj) {
    await axios.post(`${URL_BASE}/${table}`, obj)
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

export async function deletePokemon(table, id, token) {
    await axios.delete(
        `${URL_BASE}/${table}/${id}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8'
            }
        }
    )
        .then((response) => {
            return response.status;
        })
}

export async function exportPokemons(table, token) {
    await axios.get(
        `${URL_BASE}/${table}/exportar/csv`,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8'
            }
        }
    )
        .then((response) => {
            if(response.status === 200) {
                console.log(response.data)
                let csvContent = "data:text/csv;charset=utf-8," + response.data;
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", `${table}.csv`);
                document.body.appendChild(link); // Required for FF

                link.click();
            }
            else {
                console.log(response)
                console.log("Algo deu errado na exportacao")
                return [];
            }
        })
}

export async function approveFamily(id, value, token) {
    await axios.patch(
        `${URL_BASE}/familias/${id}`,
        { aprovacao: value },
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
                return []
            }
        })
}
