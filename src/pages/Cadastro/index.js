import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [responseData, setResponseData] = useState(null);
  const [inputData, setInputData] = useState({ nome: '', idade: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8000/clientes/', inputData); // Substitua a URL pela rota correta em seu backend
      setResponseData(response.data);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="App">
      <h1>Enviar Dados para o Backend</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" name="nome" value={inputData.nome} onChange={handleInputChange} />
        </div>
        <div>
          <label>Idade:</label>
          <input type="text" name="idade" value={inputData.idade} onChange={handleInputChange} />
        </div>
        <button type="submit">Enviar</button>
      </form>
      {responseData && (
        <div>
          <h2>Resposta do Backend:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
