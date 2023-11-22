import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/style-cadastro.css';
import { toast } from 'react-toastify'

function CadastroCidade() {
  const [inputData, setInputData] = useState({ nome: '',});
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputData.nome.trim() === '') {
      
      setError('O campo Cidade não pode estar vazio.');
    } else {
    try {
      const response = await axios.post('https://cima-production.up.railway.app/cidade/', inputData); 
      console.log('Dados enviados com sucesso:', response.data);
      toast.success("Cadastro realizado com sucesso!")
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="app">
      <Link className='link-voltar' to={'/cidade'}>Voltar</Link>
      <h1 className='titulo'>Cadastro de cidade</h1>
      <form className='form1' onSubmit={handleSubmit}>
        <div className='div-formulario'>
          <input className='nome-cidade' placeholder="Cidade" type="text" name="nome" value={inputData.nome} onChange={handleInputChange} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className='botao-enviar' type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CadastroCidade ;
