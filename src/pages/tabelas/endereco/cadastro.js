import React, { useState } from 'react';
import axios from 'axios';

function CadastroEndereco() {
  const [inputData, setInputData] = useState({ numero: '', complemento: '', rua: '', codbairro: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/endereco/', inputData); // Substitua a URL pela rota correta em seu backend
      console.log('Dados enviados com sucesso:', response.data);
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="App">
      <h1>Enviar Dados para o Backend</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Número:</label>
          <input type="text" name="numero" value={inputData.numero} onChange={handleInputChange} />
        </div>
        <div>
          <label>Complemento:</label>
          <input type="text" name="complemento" value={inputData.complemento} onChange={handleInputChange} />
        </div>
        <div>
          <label>Rua:</label>
          <input type="text" name="rua" value={inputData.rua} onChange={handleInputChange} />
        </div>
        <div>
          <label>Código do Bairro:</label>
          <input type="text" name="codbairro" value={inputData.codbairro} onChange={handleInputChange} />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CadastroEndereco;
