import React, { useState } from 'react';
import axios from 'axios';
import '../style/style-cadastro.css';

function CadastroCidade() {
  const [inputData, setInputData] = useState({ nome: '',});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/cidade/', inputData); 
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
    <div className="app">
      <h1 className='titulo'>Enviar Dados para o Banco</h1>
      <form className='form1' onSubmit={handleSubmit}>
        <div className='div-formulario'>
          <input className='nome-cidade' placeholder="Cidade" type="text" name="nome" value={inputData.nome} onChange={handleInputChange} />
        </div>
        <button className='botao-enviar' type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CadastroCidade ;
