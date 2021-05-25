import React from 'react';
import styled from 'styled-components';

function Button(props) {
  const color = props.color
  
  const ButtonContainer = styled.button`
    width: 150px;
    height: 40px;
    position: relative;
    border-radius: 5px;
    outline: none;
    border: 2px solid ${color ? color : 'var(--primary)'};
    background-color: ${color ? color : 'var(--primary)'};
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
  
  return (
        <ButtonContainer>
            {props.children}
        </ButtonContainer>
  );
}

export { Button }
