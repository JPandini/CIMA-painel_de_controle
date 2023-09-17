import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdatePage() {
  // State para armazenar os dados do cliente
  const [cliente, setCliente] = useState({});
  // State para armazenar o nome e idade para atualização
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(0);
  // Obtém o parâmetro "id" da URL usando o react-router-dom
  const { id } = useParams();

  // Função para buscar os dados do cliente
  useEffect(() => {
    async function loadCliente() {
      try {
        const response = await axios.get(`http://localhost:8000/clientes/${id}`);
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
        idade: idade,
      });
      // Atualiza os estados com os novos dados do cliente
      setNome(response.data.nome);
      setIdade(response.data.idade);
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
          {cliente.nome} {cliente.idade}
        </li>
      </ul>


      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="number"
        placeholder="Idade"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
      />
      <button onClick={handleUpdate}>Atualizar</button>
    </div>
  );
}

export default UpdatePage;
