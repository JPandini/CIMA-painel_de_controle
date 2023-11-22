import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/style-cadastro.css';
import { toast } from 'react-toastify'

function CadastroBairro() {
  const [inputData, setInputData] = useState({ nome: '', codcidade: '' });
  const [cidades, setCidades] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://cima-production.up.railway.app/cidade') 
      .then((response) => {
        setCidades(response.data); 
      })
      .catch((error) => {
        console.error('Erro ao buscar cidades:', error);
      });
  }, []); 

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
      const response = await axios.post('https://cima-production.up.railway.app/bairro/', inputData); // Substitua a URL pela rota correta em seu backend
      console.log('Dados enviados com sucesso:', response.data);
      toast.success("Cadastro realizado com sucesso!")
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
            className='select'
            name="codcidade"
            value={inputData.codcidade}
            onChange={handleInputChange}
          >
            <option value="">Selecione a cidade</option>
            {cidades.map((cidade) => (
              <option  key={cidade.id} value={cidade.id}>
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
