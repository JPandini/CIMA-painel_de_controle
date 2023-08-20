import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClientList() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8000/clientes/'); // Substitua pela URL correta da sua API
      setClientes(response.data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>{cliente.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default ClientList;
