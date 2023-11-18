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
  const [errors, setErrors] = useState({ nome: '', usuario: '', bairro: '' });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://cima-production.up.railway.app/bairro')
      .then((response) => {
        setBairros(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar bairros:', error);
      });

    axios.get('https://cima-production.up.railway.app/cidade')
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
        const response = await axios.get(`https://cima-production.up.railway.app/presidente/${id}`);
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
    if (novoNome.trim() === '') {
      setErrors({ ...errors, nome: 'O campo nome não pode estar vazio.' });
      return;
    } else {
      setErrors({ ...errors, nome: '' });
    }

    if (novoUsuario.trim() === '') {
      setErrors({ ...errors, usuario: 'O campo usuário não pode estar vazio.' });
      return;
    } else {
      setErrors({ ...errors, usuario: '' });
    }

    try {
      if (inputData.codbairro !== "") {
        const response = await axios.patch(`https://cima-production.up.railway.app/presidente/${id}`, {
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
        setErrors({ ...errors, bairro: 'Por favor, selecione um bairro.' });
      }
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
    }
  }

  const handleInputChange = (e) => {
    const { name, usuario, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value, [usuario]: value }));
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
              if (cidade.id === bairro.codcidade) {
                return <span className='paragrafo' key={bairro.codcidade}> {cidade.nome}</span>;
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
      {errors.nome && <p className="error-text">{errors.nome}</p>}

      <input
        className="input-update"
        type="text"
        placeholder="Novo usuário"
        value={novoUsuario}
        onChange={(e) => setNovoUsuario(e.target.value)}
      />
      {errors.usuario && <p className="error-text">{errors.usuario}</p>}
      {errors.bairro && <p className="error-text">{errors.bairro}</p>}

      <button className="botao-update" onClick={handleUpdate}>Atualizar</button>
      
    </div>
  );
}

export default UpdatePresidente;