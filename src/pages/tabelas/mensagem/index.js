import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/style-tabelas.css';

function MensagemHome() {
  const [clientes, setClientes] = useState([]);
  const [searchNome, setSearchNome] = useState('');
  const [filteredClientes, setFilteredClientes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8000/mensagem/');
      setClientes(response.data);
      setFilteredClientes(response.data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = clientes.filter(cliente =>
      cliente.conteudo.toLowerCase().includes(searchNome.toLowerCase())
    );
    setFilteredClientes(filtered);
    
  }, [searchNome, clientes]);

  const handleDelete = async (id) => {
    if (!isNaN(id)) {
      try {
        const response = await axios.delete(`http://localhost:8000/mensagem/${id}`);
        console.log('Item deletado com sucesso!', response.data);
        window.location.reload();
        alert("Usuário deletado com sucesso!")
      } catch (error) {
        console.error('Erro ao deletar o item:', error);
      }
    } else {
      console.error('ID inválido:', id);
    }
  };
  


  return (
    <div className="client-list-container">
      <h1 className="main-heading">Lista de Clientes</h1>
      <div className="client-list-container">
        <input 
          type="text"
          placeholder="Pesquisar por nome"
          value={searchNome}
          onChange={(e) => setSearchNome(e.target.value)}
          className="search-input"
        />
        <button onClick={() => setSearchNome('')} className="clear-button">Limpar</button>
      </div>
      <ul className="client-list">
        {filteredClientes.map(cliente => (
          <article key={cliente.id} className="client-item">
            <li className='nome'> {cliente.id} - {cliente.conteudo}</li>
            <Link className='link-update' to={`/update/${cliente.id}`}>Update</Link>
            <button className='link-delete' onClick={() => handleDelete(cliente.id)}>Deletar</button>
          </article>
        ))}
      </ul>
    </div>
  );
}

export default MensagemHome;
