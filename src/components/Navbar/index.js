import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Drawer from '../Drawer';

const Nav = styled.nav`
    width: 100%;
    height: 60px;
    display: flex;
    z-index: 100;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding-left: 3%;
    padding-right: 3%;
    background: var(--grayDark);

    @media (max-width: 800px) {
       height: 50px;
    }
`;

const Logo = styled.h1`
  font-size: 25px;
  font-weight: bold;
  color: var(--grayLight);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

function Navbar() {
  return (
    <Nav>
      <Link to="/">
        <Logo>AACCS</Logo>
      </Link>
      <Drawer/>
    </Nav>
  );
}

export { Navbar }
