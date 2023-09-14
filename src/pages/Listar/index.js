import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css';

function ClientList() {
  const [clientes, setClientes] = useState([]);
  const [searchNome, setSearchNome] = useState('');
  const [filteredClientes, setFilteredClientes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8000/clientes/');
      setClientes(response.data);
      setFilteredClientes(response.data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = clientes.filter(cliente =>
      cliente.nome.toLowerCase().includes(searchNome.toLowerCase())
    );
    setFilteredClientes(filtered);
  }, [searchNome, clientes]);

  const handleDelete = async (id) => {
    if (!isNaN(id)) {
      try {
        const response = await axios.delete(`http://localhost:8000/clientes/${id}`);
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
    <div>
      <h1>Lista de Clientes</h1>
      <div>
        <input
          type="text"
          placeholder="Pesquisar por nome"
          value={searchNome}
          onChange={(e) => setSearchNome(e.target.value)}
        />
        <button onClick={() => setSearchNome('')}>Limpar</button>
      </div>
      <ul>
        {filteredClientes.map(cliente => (
          <article key={cliente.id}>
            <li className='nome'> {cliente.id} - {cliente.nome} - {cliente.idade}</li>
            <Link className='link-update' to={`/update/${cliente.id}`}>Update</Link>
            <button className='link-delete' onClick={() => handleDelete(cliente.id)}>Deletar</button>
          </article>
        ))}
      </ul>
    </div>
  );
}

export default ClientList;
