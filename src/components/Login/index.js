import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from '../Button';
import styled from 'styled-components';

const UserCard = styled.div`
    margin-left: 5%;
    margin-right: 5%;
    border-radius: 5px;
    text-align: center;
    font-size: 18px;
    color: var(--grayLight);
    cursor: pointer;
`;

UserCard.Img = styled.img`
    width: 50px;
    border-radius: 50px;
`;


const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  if (isAuthenticated)
    return (
        <>
            <UserCard>
                <UserCard.Img src={user.picture} alt={user.name} />
                <div>Bem vindo {user.name.split('@')[0]}!</div>
                <br/>
            </UserCard>
            <Button onClick={() => logout({ returnTo: window.location.origin })}>
                Log Out
            </Button>
        </>
      );
  else
    return (
        <Button onClick={() => loginWithRedirect()}>LogIn</Button>
    );
};

export { LoginButton };