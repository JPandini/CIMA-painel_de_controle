import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../style/style-update.css';

function UpdatePresidente() {
  const [presidentes, setPresidentes] = useState([]);
  const [novoNome, setNovoNome] = useState("");
  const [novoUsuario, setNovoUsuario] = useState("");

  const [inputData, setInputData] = useState({ nome: '', codbairro: '' });
  const [bairros, setBairros] = useState([]);
  const [cidades, setCidades] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/bairro')
      .then((response) => {
        setBairros(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar cidades:', error);
      });

    axios.get('http://localhost:8000/cidade')
      .then((response) => {
        setCidades(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar cidades:', error);
      });
  }, []);

  useEffect(() => {
    async function loadPresidente() {
      try {
        const response = await axios.get(`http://localhost:8000/presidente/${id}`);
        if (Array.isArray(response.data.data)) {
          setPresidentes(response.data.data);
          console.log("Dados do presidente:", response.data.data);
        } else {
          console.error("Resposta da API não contém um array:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    }
    loadPresidente();
  }, [id]);

  async function handleUpdate() {
    try {
      if (inputData.codbairro !== "") {
        const response = await axios.patch(`http://localhost:8000/presidente/${id}`, {
          nome: novoNome,
          usuario: novoUsuario,
          senha: presidentes[0].senha, // Mantenha a senha atual
          email: presidentes[0].email, // Mantenha o email atual
          codbairro: inputData.codbairro,
        });
        setPresidentes({ ...presidentes, nome: response.data.nome });
        alert("Atualização realizada com sucesso");
        navigate("/presidente");
      } else {
        alert("Por favor, selecione um bairro.");
      }
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
    }
  }

  const handleInputChange = (e) => {
    const { name, usuario, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value, [usuario]:value }));
  };

  return (
    <div className="geral-tela-update">
      <h1 className="titulo-update-screen">Update</h1>
      <ul className="ul-get">
        {presidentes.map((presidente) => (
          <li className="listagem" key={presidente.id}>{presidente.nome}</li>
        ))}
      </ul>

      <select
        className='select'
        name="codbairro"
        value={inputData.codbairro}
        onChange={handleInputChange}
      >
        <option value="">Selecione o bairro</option>
        {bairros.map((bairro) => (
          <option key={bairro.id} value={bairro.id}>
            {bairro.nome} -
            {cidades.map((cidade) => {
              while (cidade.id === bairro.codcidade) {
                return <p className='paragrafo' key={bairro.codcidade}> {cidade.nome}</p>;
              }
              return null;
            })}
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

      <input
        className="input-update"
        type="text"
        placeholder="Novo usuário"
        value={novoUsuario}
        onChange={(e) => setNovoUsuario(e.target.value)}
      />

      <button className="botao-update" onClick={handleUpdate}>Atualizar</button>
    </div>
  );
}

export default UpdatePresidente;
