import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CadastroUsuario() {
  const [inputData, setInputData] = useState({ nome: '', usuario:'', senha:'', endereco: '', email:'',cpf:'', codendereco:''});
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputData.nome.trim() === '') {
      setError('O campo nome não pode estar vazio.');
      return;
    }

    if (inputData.usuario.trim() === '') {
      setError('O campo usuario não pode estar vazio.');
      return;
    }
    if (inputData.senha.trim() === '') {
      setError('O campo senha não pode estar vazio.');
      return;
    }
    if (inputData.endereco.trim() === '') {
      setError('O campo endereco não pode estar vazio.');
      return;
    }

    if (inputData.email.trim() === '') {
      setError('O campo email não pode estar vazio.');
      return;
    }

    if (inputData.cpf.trim() === '') {
      setError('O campo cpf não pode estar vazio.');
      return;
    }
    if (inputData.codendereco.trim() === '') {
      setError('O campo id_endereco não pode estar vazio.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/usuario/', inputData); // Substitua a URL pela rota correta em seu backend
      console.log('Dados enviados com sucesso:', response.data);
      alert("Cadastro realizado com sucesso!")
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, usuario, senha, endereco, email, cpf, codendereco, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value, [usuario]: value, [senha]: value, [endereco]: value, [email]: value, [cpf]: value, [codendereco]: value }));
  };

  return (
    <div className="app">
    <Link className='link-voltar' to={'/usuario'}>Voltar</Link>
      <h1 className='titulo'>Enviar Dados para o Backend</h1>
      <form className='form1' onSubmit={handleSubmit}>
        <div> 
          <input className='nome-cidade' placeholder="Nome" type="text" name="nome" value={inputData.nome} onChange={handleInputChange} />
          <input className='nome-cidade'  type="text" name="usuario" value={inputData.usuario} onChange={handleInputChange} />
          <input className='nome-cidade' type="text" name="senha" value={inputData.senha} onChange={handleInputChange} />
          <input className='nome-cidade' type="text" name="endereco" value={inputData.endereco} onChange={handleInputChange} />
          <input className='nome-cidade' type="text" name="email" value={inputData.email} onChange={handleInputChange} />
          <input className='nome-cidade' type="text" name="cpf" value={inputData.cpf} onChange={handleInputChange} />
          <input className='nome-cidade' type="text" name="codendereco" value={inputData.codendereco} onChange={handleInputChange} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CadastroUsuario ;
