import React, { useState } from 'react';
import axios from 'axios';

function CadastroGrupo() {
  const [inputData, setInputData] = useState({ nome: '',});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/cidade/', inputData); // Substitua a URL pela rota correta em seu backend
      console.log('Dados enviados com sucesso:', response.data);
      alert("Cadastro realizado com sucesso!")
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
          <label>Nome:</label>
          <input type="text" name="nome" value={inputData.nome} onChange={handleInputChange} />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CadastroGrupo ;
