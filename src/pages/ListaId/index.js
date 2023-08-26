import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ListaId() {
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
  }, [id]); // Include 'id' as a dependency to fetch data when the ID changes

  return (
    <div>
      <h1>Detalhes do Cliente</h1>
      <ul>
        {cliente.map(cliente => (
          <li key={cliente.id}>{cliente.nome}</li>
        ))}
      </ul>

    </div>
  );
}

export default ListaId;
