import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/style-cadastro.css';

function CadastroPresidente() {
  const [inputData, setInputData] = useState({ nome: '', usuario: '', senha:'', email: '', codbairro: ''});
  const [error, setError] = useState('');
  const [bairros, setBairros] = useState([]);
  const [cidades, setCidades] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8000/bairro') 
      .then((response) => {
        setBairros(response.data); 
      })
      .catch((error) => {
        console.error('Erro ao buscar cidades:', error);
      });
  }, []); 
  axios.get('http://localhost:8000/cidade')
      .then((response) => {
        setCidades(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar cidades:', error);
      });



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
    if (inputData.email.trim() === '') {
      setError('O campo email não pode estar vazio.');
      return;
    }
    if (inputData.codbairro.trim() === '') {
      setError('O campo id_Bairro não pode estar vazio.');
      return;
    }

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
          <input type="password" className='nome-cidade' placeholder="Senha" name="senha" value={inputData.senha} onChange={handleInputChange} />
          <input type="text" className='nome-cidade' placeholder="Email" name="email" value={inputData.email} onChange={handleInputChange} />
          
          <select
            className='select'
            name="codbairro"
            value={inputData.codbairro}
            onChange={handleInputChange}
          >
            <option value="">Selecione o bairro</option>
            {bairros.map((bairro) => (
              <option  key={bairro.id} value={bairro.id}>
                {bairro.nome} - 
                {cidades.map((cidade) => {while (cidade.id === bairro.codcidade) {
                  return <p className='paragrafo' key={bairro.codcidade}> {cidade.nome}</p>;
                }
                return null;
                })}
                
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

export default CadastroPresidente ;
