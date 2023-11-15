import React, { useState } from 'react';
import axios from 'axios';

function CadastroGrupo() {
  const [inputData, setInputData] = useState({ nome: '', codbairro: ''});
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputData.nome.trim() === '') {
      setError('O campo número não pode estar vazio.');
      return;
    }
    if (inputData.codbairro.trim() === '') {
      setError('O campo complemento não pode estar vazio.');
      return;
    }

    try {
      const response = await axios.post('https://cima-production.up.railway.app/grupo/', inputData);
      console.log('Dados enviados com sucesso:', response.data);
      alert("Cadastro realizado com sucesso!")
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, codbairro, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value, [codbairro]:value}));
  };

  return (
    <div className="App">
      <h1>Enviar Dados para o Backend</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" name="nome" value={inputData.nome} onChange={handleInputChange} />
          <input type="text" name="codbairro" value={inputData.codbairro} onChange={handleInputChange} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CadastroGrupo ;
