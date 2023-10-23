import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdateCidade() {
  const [cidade, setCidade] = useState({ nome: "" });
  const [novoNome, setNovoNome] = useState("");
  const { id } = useParams();

  // Função para buscar os dados da cidade
  useEffect(() => {
    async function loadCidade() {
      try {
        const response = await axios.get(`http://localhost:8000/cidade/${id}`);
        setCidade(response.data);
        console.log("Dados da cidade:", response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    }
    loadCidade();
  }, [id]);

  // Função para atualizar o nome da cidade
  async function handleUpdate() {
    try {
      const response = await axios.patch(`http://localhost:8000/cidade/${id}`, {
        nome: novoNome,
      });
      setCidade({ ...cidade, nome: response.data.nome });
      alert("Atualização realizada com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
    }
  }

  return (
    <div>
      <h1>Detalhes da Cidade</h1>
      <ul>
        <li>
          {cidade.nome}
        </li>
      </ul>

      <input
        type="text"
        placeholder="Novo Nome"
        value={novoNome}
        onChange={(e) => setNovoNome(e.target.value)}
      />

      <button onClick={handleUpdate}>Atualizar</button>
    </div>
  );
}

export default UpdateCidade;
