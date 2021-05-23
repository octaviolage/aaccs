import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components';

const Button = styled.button`
  width: 150px;
  height: 40px;
  position: relative;
  border-radius: 5px;
  outline: none;
  border: 2px solid var(--primary);
  background-color: var(--primary);
  color: var(--white);
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-weight: bold;
  cursor: pointer;
  left: 50%;
  margin-top: 20px;
  transition: opacity 1;

  &:hover,
    &:focus {
      box-shadow: none;
    }
`;

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
            <Button onClick={ ()=> logout({ returnTo: window.location.origin })}>
                Log Out
            </Button>
        </>
      );
  else
    return (
      <>
        <br /><br />
        <Button onClick={() => loginWithRedirect()}>LogIn</Button>
      </>
    );
};

export { LoginButton };