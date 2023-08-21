import React, { useState } from 'react';
import axios from 'axios';

function AddClientForm({ onClientAdded }) {
  const [nome, setNome] = useState('');

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleAddClient = async () => {
      const response = await axios.post('http://localhost:8000/clientes/', { nome }); // Substitua pela URL correta da sua API
      onClientAdded(response.data);
      
      setNome(''); // Limpa o campo de nome após a adição
      console.log(response.data)

  };

  return (
    <div>
      <h2>Adicionar Novo Cliente</h2>
      <input
        type="text"
        placeholder="Nome do Cliente"
        value={nome}
        onChange={handleNomeChange}
      />
      <button onClick={handleAddClient}>Adicionar Cliente</button>
    </div>
  );
}

export default AddClientForm;