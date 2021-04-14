import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FileFieldWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  background: var(--grayLight);
  color: var(--grayDark);
  display: block;
  min-width: 300px;
  width: 80%;
  height: 57px;
  font-size: 16px;
  
  outline: 0;
  border: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid #53585D;
  
  padding: 16px 16px;
  margin: auto auto auto 10%;
  margin-bottom: 15px;
  
  resize: none;
  border-radius: 4px;
  transition: border-color .3s;
  
  &:focus {
    border-bottom-color: var(--primary);
  }
  @media(max-width: 800px){
      width: 90%;
      margin: 3% auto auto auto;
  }
`;

function FileField({
  type, name, value, onChange, accept, multiple
}) {

  const isTextArea = type === 'textarea';

  return (
    <FileFieldWrapper>
        <Input
          as={isTextArea ? 'textarea' : 'input'}
          type={type}
          value={value}
          name={name}
          accept={accept}
          multiple={multiple}
          onChange={onChange}
        />
    </FileFieldWrapper>
  );
}

FileField.defaultProps = {
  type: 'text',
  value: '',
  accept: '*',
  multiple: false
};

FileField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export { FileField };