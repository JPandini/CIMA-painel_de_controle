import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/style-cadastro.css'; 

function CadastroEndereco() {
  const [inputData, setInputData] = useState({ numero: '', complemento: '', rua: '', codbairro: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/endereco/', inputData); // Substitua a URL pela rota correta em seu backend
      console.log('Dados enviados com sucesso:', response.data);
      alert("Cadastro realizado com sucesso!");
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
    <Link className='link-voltar' to={'/endereco'}>Voltar</Link>
      <h1 className='titulo'>Cadastro de endereço</h1>
      <form className='form1' onSubmit={handleSubmit}>
        <div className='div-formulario'>
          <input className='nome-cidade' placeholder="Número" type="text" name="numero" value={inputData.numero} onChange={handleInputChange} />
          <input className='nome-cidade' placeholder="Complemento" type="text" name="complemento" value={inputData.complemento} onChange={handleInputChange} />
          <input className='nome-cidade' placeholder="Rua" type="text" name="rua" value={inputData.rua} onChange={handleInputChange} />
          <input className='nome-cidade' placeholder="id_bairro" type="text" name="codbairro" value={inputData.codbairro} onChange={handleInputChange} />
        </div>
        <button className='botao-enviar' type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CadastroEndereco;
