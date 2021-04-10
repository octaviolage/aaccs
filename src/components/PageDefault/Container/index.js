import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
    width: 90%;
    min-height: 100vh;
    background: #F6F6F6;
    max-width: 800px;
    box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin: auto;

    @media (max-width: 1100px) {
        width: 100%;
    }
`;

function Container(props) {
  return (
        <Background>
            {props.children}
        </Background>
  );
}

export { Container }
