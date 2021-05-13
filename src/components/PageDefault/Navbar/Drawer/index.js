import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LoginButton } from '../../../Login'

const Drawer = styled.div`
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: var(--grayDark);
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
`;

Drawer.Item = styled.a`
  padding: 8px 8px 8px 50px;
  text-decoration: none;
  font-size: 18px;
  color: var(--grayLight);
  display: flex;
  transition: 0.3s;
  margin-left: 5px;
  cursor: pointer;

  &:hover {
    color: var(--primary);
  }
`;

Drawer.Close = styled(Drawer.Item)`
  position: absolute;
  top: 0;
  left: -40px;
  font-size: 30px;
  font-family: sans-serif;
`;

Drawer.Open = styled.span`
  transform: rotate(90deg);
  font-weight: bold;
  font-size: 26px;
  color: var(--white);
  cursor: pointer;
`;

Drawer.Divider = styled.div`
  width: 90%;
  margin: auto;
  border: 1px solid var(--grayMedium);
  margin-top: 5px;
  margin-bottom: 5px;
`;

Drawer.Overlay = styled.div`
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 60px;
  background-color: rgba(0, 0, 0, 0.3);
`;

export default function DrawerMenu() {
  const [width, setWidth] = React.useState(0);

  function closeDrawer() { setWidth(0); }
  function openDrawer() { setWidth('250px'); }

  return (
    <>
      <Drawer style={{
        width: `${width}`,
        boxShadow: `${width
          ? `1px 0px var(--primary)`
          : '0px 0px'}`,
      }}
      >
        <Drawer.Close onClick={closeDrawer}>
          x
        </Drawer.Close>
        <LoginButton />
        <Link to="/">
          <Drawer.Item>
            Inicio
          </Drawer.Item>
        </Link>
        <Drawer.Divider />
        <Link to="/familias">
          <Drawer.Item>
            Ver famílias
          </Drawer.Item>
        </Link>
        <Drawer.Divider />
        <Link to="/cadastro/doacao">
          <Drawer.Item>
            Doador
          </Drawer.Item>
        </Link>
        <Link to="/cadastro/familia">
          <Drawer.Item>
            Cadastro familiar
          </Drawer.Item>
        </Link>
        <Drawer.Divider />
        <Link to="/">
          <Drawer.Item>
            História
          </Drawer.Item>
        </Link>
        <Link to="/">
          <Drawer.Item>
            Nossos projetos
          </Drawer.Item>
        </Link>
        <Link to="/">
          <Drawer.Item>
            Contato
          </Drawer.Item>
        </Link>
      </Drawer>
      <Drawer.Open onClick={openDrawer}>
        |||
      </Drawer.Open>
      <Drawer.Overlay style={{ width: `${width ? '100%' : 0}` }} />
    </>
  );
}
