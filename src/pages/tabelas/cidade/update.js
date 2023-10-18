import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdateCidade() {

  const [cliente, setCliente] = useState({});
  const [nome, setNome] = useState("");
  const { id } = useParams();

  // Função para buscar os dados do cliente
  useEffect(() => {
    async function loadCliente() {
      try {
        const response = await axios.get(`http://localhost:8000/cidade/${id}`);
        setCliente(response.data);
        console.log("Dados do cliente:", response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    }
    loadCliente();
  }, [id]);

  // Função para atualizar o cliente
  async function handleUpdate() {
    try {
      // Faz uma requisição PATCH para atualizar os dados do cliente
      const response = await axios.patch(`http://localhost:8000/clientes/${id}`, {
        nome: nome,
      });
      // Atualiza os estados com os novos dados do cliente
      setNome(response.data.nome);
      alert("Atualização realizada com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
    }
  }

  return (
    <div>
      <h1>Detalhes do Cliente</h1>
      <ul>
        <li key={cliente.id}>
          {cliente.nome}
        </li>
      </ul>


      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      
      <button onClick={handleUpdate}>Atualizar</button>
    </div>
  );
}

export default UpdateCidade;
