import React, { useEffect, useState } from "react";
import { useParams,  useNavigate, Link  } from "react-router-dom";
import axios from "axios";
import '../style/style-update.css';


function UpdateUsuario() {
  const [usuarios, setUsuario] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [inputData, setInputData] = useState({codbairro: '' });

  const { id } = useParams();
  const navigate = useNavigate();


  // Função para buscar os dados da cidade
  useEffect(() => {
    async function loadUsuario() {
      try {
        const response = await axios.get(`https://cima-production.up.railway.app/usuario/${id}`);
        if (Array.isArray(response.data.data)) {
          setUsuario(response.data.data);
          console.log("Dados da cidade:", response.data.data);
        } else {
          console.error("Resposta da API não contém um array:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    }
    
    loadUsuario();
  }, [id]);
  
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

  async function handleUpdate() {
    try {
      const response = await axios.patch(`https://cima-production.up.railway.app/usuario/${id}`, {
        nome: inputData.nome,
        codbairro: inputData.codbairro,
      });
      setUsuario({ ...usuarios, nome: response.data.nome });
      alert("Atualização realizada com sucesso");
      navigate("/usuario");

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
      <Link className='link-voltar' to={'/usuario'}>Voltar</Link>

      <h1 className="titulo-update-screen">Atualizar Usuario</h1>
      <ul className="ul-get">
        {usuarios.map((usuario) => (
          <li className="listagem-presidente" key={usuario.id}>{usuario.nome}</li>
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


      
      <button className="botao-update" onClick={handleUpdate}>Atualizar</button>
    </div>
  );
}

export default UpdateUsuario;
