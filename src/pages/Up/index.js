import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdatePage() {
  const [cliente, setCliente] = useState({});
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState(0);

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

  async function handleUpdate() {
    try {
      const response = await axios.patch(`http://localhost:8000/clientes/${id}`, {
        nome: nome,
        idade: idade
      });
      setNome(response.data.nome);
      setIdade(response.data.idade);
      alert("Update Realizado");
      
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  return (
    <div>
      <h1>Detalhes do Cliente</h1>
      <ul>
        <li key={cliente.id}>
          {cliente.nome} {cliente.idade}
        </li>
      </ul>

      <input
        type="text"
        placeholder="Nome"
        value={nome} 
        onChange={e => setNome(e.target.value)} 
      />
      <input
        type="number" 
        placeholder="Idade"
        value={idade} 
        onChange={e => setIdade(e.target.value)} 
      />
      <button onClick={handleUpdate}>Atualizar</button>
    </div>
  );
}

export default UpdatePage;
