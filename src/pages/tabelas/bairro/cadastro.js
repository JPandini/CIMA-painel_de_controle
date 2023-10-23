import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/style-cadastro.css';

function CadastroBairro() {
  const [inputData, setInputData] = useState({ nome: '', codcidade: '' });
  const [cidades, setCidades] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Buscar cidades do seu backend e definir no estado cidades
    axios.get('http://localhost:8000/cidade') // Substitua a URL pela rota correta em seu backend
      .then((response) => {
        setCidades(response.data); // Define as cidades no estado
      })
      .catch((error) => {
        console.error('Erro ao buscar cidades:', error);
      });
  }, []); // O segundo argumento vazio garante que a chamada ocorrerá apenas uma vez

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
    <div className="app">
      <Link className='link-voltar' to={'/bairro'}>Voltar</Link>
      <h1 className='titulo'>Cadastro de bairro</h1>
      <form className='form1' onSubmit={handleSubmit}>
        <div className='div-formulario'>
          <input className='nome-cidade' placeholder="Bairro" type="text" name="nome" value={inputData.nome} onChange={handleInputChange} />
          <select
            className='nome-cidade'
            name="codcidade"
            value={inputData.codcidade}
            onChange={handleInputChange}
          >
            <option value="">Selecione a cidade</option>
            {cidades.map((cidade) => (
              <option key={cidade.id} value={cidade.id}>
                {cidade.nome}
              </option>
            ))}
          </select>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className='botao-enviar' type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CadastroBairro;
