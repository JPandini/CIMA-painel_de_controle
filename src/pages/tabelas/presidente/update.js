import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../style/style-update.css';
import { toast } from 'react-toastify'

function UpdatePresidente() {
  const [presidentes, setPresidentes] = useState([]);
  const [novoNome, setNovoNome] = useState("");
  const [novoUsuario, setNovoUsuario] = useState("");

  const [inputData, setInputData] = useState({ nome: '', codbairro: '' });
  const [bairros, setBairros] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [error, setError] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://cima-production.up.railway.app/bairro')
      .then((response) => {
        setBairros(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar cidades:', error);
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

  const handleUpdate = async () => {
    try {
      if (novoNome.trim() === '') {
        setError('O campo nome não pode estar vazio.');
        return;
      }
      if (novoUsuario.trim() === '') {
        setError('O campo usuário não pode estar vazio.');
        return;
      }
      if (inputData.codbairro === '') {
        setError('Por favor, selecione um bairro.');
        return;
      }

      const response = await axios.patch(`https://cima-production.up.railway.app/presidente/${id}`, {
        nome: novoNome,
        usuario: novoUsuario,
        senha: presidentes[0].senha, // Mantenha a senha atual
        email: presidentes[0].email, // Mantenha o email atual
        codbairro: inputData.codbairro,
      });
      setPresidentes({ ...presidentes, nome: response.data.nome });
      toast.success("Atualização realizada com sucesso");
      navigate("/presidente");
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="geral-tela-update">
      <h1 className="titulo-update-screen">Atualizar Presidente</h1>
      <ul className="ul-get">
        {presidentes.map((presidente) => (
          <li className="listagem-presidente" key={presidente.id}>{presidente.nome}</li>
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
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className="botao-update" onClick={handleUpdate}>Atualizar</button>
    </div>
  );
}

export default UpdatePresidente;