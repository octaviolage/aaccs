import { useState } from 'react';

function useForm(valoresIniciais) {
  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor, // nome: 'valor'
    });
  }

  function handleChange(buffer) {
    setValue(
      buffer.target.getAttribute('name'),
      buffer.target.value,
    );
  }

  function clearForm() {
    setValue(valoresIniciais);
  }

  return {
    values,
    handleChange,
    clearForm,
  };
}

export { useForm };