import React from 'react';
import styled from 'styled-components';

const Foot = styled.nav`
    width: 100%;
    padding: 2%;
    background: var(--grayDark);
    box-shadow: 0px 8px 4px 4px rgba(0, 0, 0, 0.25);

    align-self: center;
    text-align: center;
    color: var(--grayLight);
    font-size: 12px;

    @media (max-width: 800px) {
       width: 100%;
        padding: 4%;
    }
`;

function Footer() {
  return (
    <Foot>
      Desenvolvido pelo curso de Engenharia de Software da PUC Minas 2021
    </Foot>
  );
}

export { Footer }
