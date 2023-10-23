import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/style-cadastro.css';


function CadastroBairro() {
  const [inputData, setInputData] = useState({ nome: '', codcidade: '',});
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputData.nome.trim() === '') {
      setError('O campo nome não pode estar vazio.');
      return;
    }

    
    if (inputData.codcidade.trim() === '') {
      setError('O campo id_Cidade não pode estar vazio.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/bairro/', inputData); // Substitua a URL pela rota correta em seu backend
      console.log('Dados enviados com sucesso:', response.data);
      alert("Cadastro realizado com sucesso!")
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, codcidade, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value, [codcidade]: value}));
  };

  return (
    <div className="app">
    <Link className='link-voltar' to={'/bairro'}>Voltar</Link>
      <h1 className='titulo'>Cadastro de bairro</h1>
      <form className='form1' onSubmit={handleSubmit}>
        <div className='div-formulario'>
          <input className='nome-cidade' placeholder="Bairro" type="text" name="nome" value={inputData.nome} onChange={handleInputChange} />
          <input className='nome-cidade' placeholder="id_cidade" type="text" name="codcidade" value={inputData.codcidade} onChange={handleInputChange} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className='botao-enviar' type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CadastroBairro;
