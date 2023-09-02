import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DeletePage() {
  const [cliente, setCliente] = useState([]);
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState();

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

  async function hundleUpdate() {
   
      const response = await axios.delete(`http://localhost:8000/clientes/${id}`, {
        nome: nome,
        idade: idade
      });
      setNome(response.data.nome);
      setIdade(response.data.idade);
      console.log("delete Realizado");
   
  }

  return (
    <div>
      <h1>Detalhes do Cliente</h1>
      <ul>
        {cliente.map(cliente => (
          <li key={cliente.id}>{cliente.nome}</li>
        ))}
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
      <button onClick={hundleUpdate}>Atualizar</button>
    </div>
  );
}

export default DeletePage;
