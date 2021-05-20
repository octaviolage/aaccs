import React, { useEffect, useState } from 'react';
import { PageDefault } from '../../components/PageDefault';
import { FamilyTable } from '../../components/tabelas/Familias';
import { useAuth0 } from "@auth0/auth0-react";
import { getPokemons } from '../../api';

function Teste() {
    const { getAccessTokenSilently } = useAuth0();
    const [familias, setFamilias] = useState([]);

    useEffect(() => {
        const fetchToken = async () => {
            const accessToken = await getAccessTokenSilently({
                audience: `https://aaccs-portal.us.auth0.com/api/v2/`,
                scope: "read:current_user",
            })
            const familias = await getPokemons('familias', accessToken)
            setFamilias(familias);
        }
        fetchToken()
    }, [getAccessTokenSilently]);

    return (
        <PageDefault>
            <br /><br /><br /><br /><br />
            <FamilyTable
                users={familias}
            />
        </PageDefault>
    )
}

export { Teste };