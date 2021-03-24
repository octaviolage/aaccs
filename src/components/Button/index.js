import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
    width: 150px;
    height: 40px;
    border-radius: 5px;
    background: var(--primary);
    color: var(--white);
    box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.15);
    margin: auto;
    text-align: center;
    font-weight: bold;
    padding-top: 10px;
    cursor: pointer;
`;

function Button(props) {
  return (
        <ButtonContainer>
            {props.children}
        </ButtonContainer>
  );
}

export { Button }
