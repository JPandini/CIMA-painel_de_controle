import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../style/style-update.css';
import { toast } from 'react-toastify'

function UpdateBairro() {
  const [bairros, setBairros] = useState([]);
  const [novoNome, setNovoNome] = useState("");
  const [cidades, setCidades] = useState([]);
  const [inputData, setInputData] = useState({ nome: '', codcidade: '' });
  const [error, setError] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://cima-production.up.railway.app/cidade')
      .then((response) => {
        setCidades(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar cidades:', error);
      });
  }, []);

  useEffect(() => {
    async function loadBairro() {
      try {
        const response = await axios.get(`https://cima-production.up.railway.app/bairro/${id}`);
        if (Array.isArray(response.data.data)) {
          setBairros(response.data.data);
          console.log("Dados do bairro:", response.data.data);
        } else {
          console.error("Resposta da API não contém um array:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    }
    loadBairro();
  }, [id]);

  async function handleUpdate() {
    try {
      if (novoNome.trim() === '') {
        setError('O campo nome não pode estar vazio.');
        return;
      }

      if (inputData.codcidade !== "") {
        const response = await axios.patch(`https://cima-production.up.railway.app/bairro/${id}`, {
          nome: novoNome,
          codcidade: inputData.codcidade,
        });
        setBairros({ ...bairros, nome: response.data.nome });
        toast.success("Atualização realizada com sucesso");
        navigate("/bairro");
      } else {
        alert("Por favor, selecione uma cidade.");
      }
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="geral-tela-update">
      <h1 className="titulo-update-screen">Update</h1>
      <ul className="ul-get">
        {bairros.map((bairro) => (
          <li className="listagem" key={bairro.id}>{bairro.nome}</li>
        ))}
      </ul>

      <select
        className='select'
        name="codcidade"
        value={inputData.codcidade}
        onChange={handleInputChange}
      >
        <option value="">Selecione a cidade</option>
        {cidades.map((cidade) => (
          <option key={cidade.id} value={cidade.id}>
            {cidade.nome}
          </option>
        ))}
      </select>

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

export default UpdateBairro;
