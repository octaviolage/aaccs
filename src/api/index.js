
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
    try {
        await axios.post(`${URL_BASE}/${table}`, obj)
            .then((response) => {
                if (response.status === 201) {
                    window.alert("Cadastros efetuado com sucesso!");
                }
                else {
                    window.alert(
                        "Parece que o servidor esta com problemas...\nPor favor volte mais tarde"
                        );
                }
            })
    }
    catch {
        window.alert(
            "Sua imagem é grande demais ou não é um formato válido"
            );
    }
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
            if (response.status <= 299){
                window.alert('Familia removida com sucesso')
                document.location.reload()
              }
              else if (400 <= response.status <= 499){
                window.alert('Tem algo errado. Você esta logado?')
              }
              else {
                window.alert('Parece que temos um probleminha por aqui...')
              }
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

export async function scrapper() {
    await axios.get(
        `https://www.extra.com.br/cesta-b%C3%A1sica/b`,
    )
    .then((response) => {
        if (response.status === 200) {
            console.log(response.data)
            return response;
        }
        else {
            console.log('Erro de comunicação com a API')
            console.log(response)
            return []
        }
    })
}
