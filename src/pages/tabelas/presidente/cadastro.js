import React, { useState } from 'react';
import axios from 'axios';

function CadastroPresidente() {
  const [inputData, setInputData] = useState({ nome: '', usuario: '', senha:'', email: '', codbairro: ''});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/presidente/', inputData); // Substitua a URL pela rota correta em seu backend
      console.log('Dados enviados com sucesso:', response.data);
      alert("Cadastro realizado com sucesso!")
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, usuario, senha, email, codbairro, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value, [usuario]: value, [senha]: value, [email]: value, [codbairro]: value,}));
  };

  return (
    <div className="App">
      <h1>Enviar Dados para o Backend</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" name="nome" value={inputData.nome} onChange={handleInputChange} />
          <input type="text" name="usuario" value={inputData.usuario} onChange={handleInputChange} />
          <input type="text" name="senha" value={inputData.senha} onChange={handleInputChange} />
          <input type="text" name="email" value={inputData.email} onChange={handleInputChange} />
          <input type="text" name="codbairro" value={inputData.codbairro} onChange={handleInputChange} />

          
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CadastroPresidente ;
