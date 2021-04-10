import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
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

function Button(props) {
  return (
        <ButtonContainer>
            {props.children}
        </ButtonContainer>
  );
}

export { Button }
