import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./login.css";

function LoginPresidente({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://cima-production.up.railway.app/presidentelogin', formData);
  
      if (response.status === 200) {
        setIsAuthenticated(true);
        localStorage.setItem('token', response.data.token);
  
        setMensagem("Login bem-sucedido");
        
        navigate('/');
      } else {
        console.log(response.data);
        setMensagem("Credenciais inválidas. Tente novamente.");
      }
    } catch (error) {
      console.error('Erro durante o login', error);
      setMensagem("Credenciais inválidas. Tente novamente.");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
    await getAuthenticatedData();
  };

  // Função para obter dados autenticados
  const getAuthenticatedData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token não encontrado. Usuário não autenticado.');
        return;
      }

      const response = await axios.get('https://cima-production.up.railway.app/dados-autenticados', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
    } catch (error) {
      localStorage.removeItem('token');
      navigate('/loginpresidente');

      console.error('Erro ao obter dados autenticados', error);
    }
  }, [navigate]);

  // Verificar autenticação ao montar o componente
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Token presente, verificar autenticação
      getAuthenticatedData();
    }
  }, [navigate, getAuthenticatedData]); 

  return (
    <div className="geral">
      <h2 className="titulo">Login do presidente</h2>
      <form className="formulario" onSubmit={handleSubmit}>
        <input
          className="input-login"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="input-login"
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          placeholder="Senha"
        />
        <button className="botao-acessar" type="submit">
          Acessar
        </button>
        {mensagem && <p className="mensagem-erro">{mensagem}</p>}

      </form>
    </div>
  );
}

export default LoginPresidente;