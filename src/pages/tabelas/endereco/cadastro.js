import React, { useState } from 'react';
import axios from 'axios';

function CadastroEndereco() {
  const [inputData, setInputData] = useState({ numero: '',complemento: '',rua: '',codbairro: ''});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/endereco/', inputData); // Substitua a URL pela rota correta em seu backend
      console.log('Dados enviados com sucesso:', response.data);
      alert("Cadastro realizado com sucesso!")
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const handleInputChange = (e) => {
    const { numero, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [numero]: value, [complemento]: value,[rua]: value,[codbairro]: value}));
  };

  return (
    <div classnumero="App">
      <h1>Enviar Dados para o Backend</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" name="numero" value={inputData.numero} onChange={handleInputChange} />
          <input type="text" name="complemento" value={inputData.complemento} onChange={handleInputChange} />
          <input type="text" name="rua" value={inputData.rua} onChange={handleInputChange} />
          <input type="text" name="codbairro" value={inputData.codbairro} onChange={handleInputChange} />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CadastroEndereco ;
