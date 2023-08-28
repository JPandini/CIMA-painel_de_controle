import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

function DeletePage() {
  const [cliente, setCliente] = useState([]);
  const { id } = useParams(); 
  useEffect(() => {
    async function loadCliente() {
      try {
        const response = await axios.get(`http://localhost:8000/clientes/${id}`);
        setCliente(response.data);
        console.log("Deu certo!!");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadCliente();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/clientes/${id}`);
      console.log('Item deletado com sucesso!', response.data);
    } catch (error) {
      console.error('Erro ao deletar o item:', error);
    }
  };

  return (
    <div>

    <h1>Detalhes do Cliente</h1>
      <ul>
        {cliente.map(cliente => (
          <li key={cliente.id}>{cliente.nome}</li>
        ))}
      </ul>


      <h1>Deletar Item</h1>
      <button onClick={handleDelete}>Deletar</button>
    </div>
  );
}

export default DeletePage;
