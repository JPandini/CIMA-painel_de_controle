import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../style/style-update.css';
import { toast } from 'react-toastify'

function UpdateCidade() {
  const [cidades, setCidades] = useState([]);
  const [novoNome, setNovoNome] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Função para buscar os dados da cidade
  useEffect(() => {
    async function loadCidade() {
      try {
        const response = await axios.get(`https://cima-production.up.railway.app/cidade/${id}`);
        if (Array.isArray(response.data.data)) {
          setCidades(response.data.data);
          console.log("Dados da cidade:", response.data.data);
        } else {
          console.error("Resposta da API não contém um array:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    }
    loadCidade();
  }, [id]);

  // Função para atualizar o nome da cidade
  async function handleUpdate() {
    try {
      if (novoNome.trim() === '') {
        setError('O campo nome não pode estar vazio.');
        return;
      }

      const response = await axios.patch(`https://cima-production.up.railway.app/cidade/${id}`, {
        nome: novoNome,
      });

      setCidades({ ...cidades, nome: response.data.nome });
      toast.success("Atualização realizada com sucesso");
      navigate("/cidade");
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
    }
  }

  return (
    <div className="geral-tela-update">
      <h1 className="titulo-update-screen">Atualizar Cidade</h1>
      <ul className="ul-get">
        {cidades.map((cidade) => (
          <li className="listagem" key={cidade.id}>{cidade.nome}</li>
        ))}
      </ul>

      <input
        className="input-update"
        type="text"
        placeholder="Novo Nome"
        value={novoNome}
        onChange={(e) => setNovoNome(e.target.value)}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className="botao-update" onClick={handleUpdate}>Atualizar</button>
    </div>
  );
}

export default UpdateCidade;
