import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  };

  const handleUpdate = (id) => {
    axios.put(`/api/data/${id}`, { newName })
      .then(response => {
        console.log('Dados atualizados com sucesso:', response.data);
        fetchData(); // Recarregar os dados após a atualização
      })
      .catch(error => {
        console.error('Erro ao atualizar os dados:', error);
      });
  };

  return (
    <div className="App">
      <h1>Dados do Banco de Dados</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.nome}{' '}
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />
            <button onClick={() => handleUpdate(item.id)}>Atualizar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
