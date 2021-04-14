import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const FormFieldWrapper = styled.div`
  position: relative;
  textarea {
    min-height: 150px;
  }
`;

const Label = styled.label``;

Label.Text = styled.span`
  color: var(--grayDark);
  height: 57px;
  position: absolute; 
  top: 0;
  left: ${({ position }) => {return position === "main" ? 'calc(30% + 15px);' : 'calc(10% + 15px);'}};
  
  display: flex;
  align-items: center;
  
  transform-origin: 0% 0%;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  
  transition: .1s ease-in-out;

  @media(max-width: 815px){
      left: calc(10%);
  }
`;

const Input = styled.input`
  background: var(--grayLight);
  color: var(--grayDark);
  display: block;
  min-width: 300px;
  width: ${({ position }) => {return position === "main" || position === "reduced" ? '30%' : '80%'}};
  height: 57px;
  font-size: 16px;
  
  outline: 0;
  border: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid #53585D;
  
  padding: 16px 16px;
  margin: ${({ position }) => {return position === "main" ? 'auto' : 'auto auto auto 10%'}};
  margin-bottom: 15px;
  
  resize: none;
  border-radius: 4px;
  transition: border-color .3s;
  
  &:focus {
    border-bottom-color: var(--primary);
  }
  &:focus:not([type='color']) + ${Label.Text} {
    transform: scale(.6) translateY(-10px);
  }
  ${({ value }) => {
    const hasValue = value.length > 0;
    return hasValue && css`
        &:not([type='color']) + ${Label.Text} {
          transform: scale(.6) translateY(-10px);
        }
      `;
      }
    }
  @media(max-width: 800px){
      width: 90%;
      margin: 3% auto auto auto;
  }
`;

function FormField({
  label, type, name, value, onChange, position
}) {

  const isTextArea = type === 'textarea';

  return (
    <FormFieldWrapper>
      <Label>
        <Input
          as={isTextArea ? 'textarea' : 'input'}
          position={position}
          type={type}
          value={value}
          name={name}
          onChange={onChange}
        />
        <Label.Text
          position={position}
        >
          {label}
          :
        </Label.Text>
      </Label>
    </FormFieldWrapper>
  );
}

FormField.defaultProps = {
  type: 'text',
  value: '',
  position: ''
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  position: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export { FormField };