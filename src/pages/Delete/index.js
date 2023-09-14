import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DeletePage() {
  const [cliente, setCliente] = useState({});
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
        <li>{cliente.nome}</li>
      </ul>
      <h1>Deletar Item</h1>
      <button onClick={handleDelete}>Deletar</button>
    </div>
  );
}

export default DeletePage;
