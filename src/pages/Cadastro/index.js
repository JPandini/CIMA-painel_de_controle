import React, { useState } from 'react';
import axios from 'axios';
import './cadastro.css'

function CadastroAdmin() {
  const [formData, setFormData] = useState({
    nome: '',
    usuario: '',
    email: '',
    senha: '',
    
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://cima-production.up.railway.app/admin', formData);
      
      if (response.status === 201) {
        setMensagem('Cadastro realizado com sucesso');
      }
    } catch (error) {
      setMensagem('Erro ao cadastrar. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="cadastro-form">
      <h2 className="cadastro-title">Cadastro</h2>
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Nome"
          className="cadastro-input"
        />
        <input
          type="text"
          name="usuario"
          value={formData.usuario}
          onChange={handleChange}
          placeholder="Nome de usuário" 
          className="cadastro-input"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="cadastro-input"
        />
        <input
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          placeholder="Senha"
          className="cadastro-input"
        />
        <button type="submit" className="cadastro-button">Cadastrar</button>
      </form>
      {mensagem && <p className="cadastro-mensagem">{mensagem}</p>}
    </div>
  );
}

export default CadastroAdmin;
