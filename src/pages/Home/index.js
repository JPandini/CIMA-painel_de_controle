import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClientList() {
  const [clientes, setClientes] = useState([]);
  const [newClient, setNewClient] = useState({ nome:''}); // Estado para armazenar os dados do novo cliente

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/clientes/'); // Substitua pela URL correta da sua API
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    }

    fetchData();
  }, []);

  const handleClientAdded = async () => {
    try {
      const response = await axios.post('http://localhost:8000/clientes/', newClient); // Substitua pela URL correta da sua API
      setClientes([...clientes, response.data]);
      setNewClient({ nome:''}); // Limpar os campos após o POST
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>{cliente.nome}</li>
        ))}
      </ul>
      <div>
        <h2>Adicionar Novo Cliente</h2>
        <input
          type="text"
          placeholder="Nome"
          value={newClient.nome}
          onChange={e => setNewClient({ ...newClient, nome: e.target.value })}
        />
        
        <button onClick={handleClientAdded}>Adicionar Cliente</button>
      </div>
    </div>
  );
}

export default ClientList;
