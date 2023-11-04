import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"; // Importar o Axios
import "./login.css";

function Login() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fazer uma solicitação POST para a sua API
      const response = await axios.post('http://localhost:8000/adminlogin', formData);

      if (response.status === 200) {
        setMensagem("Login bem-sucedido");
        // Navegar para a página após o login
        navigate("/"); // Certifique-se de que a rota '/dashboard' exista
      } else {
        console.log(response.data);
        setMensagem("Credenciais inválidas. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setMensagem("Ocorreu um erro durante o login. Tente novamente.");
    
    }
  };

  return (
    <div className="geral">
      <h2 className="titulo">Login</h2>
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
        <Link to={"/cadastro"}>
          <p>Não possui cadastro?</p>
        </Link>
      </form>
    </div>
  );
}

export default Login;
