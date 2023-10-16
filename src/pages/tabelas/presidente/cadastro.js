import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/style-cadastro.css';

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
    <div className="app">
    <Link className='link-voltar' to={'/presidente'}>Voltar</Link>
    <h1 className='titulo'>Cadastro de presidente do bairro</h1>
    <form className='form1' onSubmit={handleSubmit}>
      <div className='div-formulario'>

          <input type="text" className='nome-cidade' placeholder="Nome Completo" name="nome" value={inputData.nome} onChange={handleInputChange} />
          <input type="text" className='nome-cidade' placeholder="Usuário" name="usuario" value={inputData.usuario} onChange={handleInputChange} />
          <input type="text" className='nome-cidade' placeholder="Senha" name="senha" value={inputData.senha} onChange={handleInputChange} />
          <input type="text" className='nome-cidade' placeholder="Email" name="email" value={inputData.email} onChange={handleInputChange} />
          <input type="text" className='nome-cidade' placeholder="id_bairro" name="codbairro" value={inputData.codbairro} onChange={handleInputChange} />

          
        </div>
        <button className='botao-enviar' type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CadastroPresidente ;
