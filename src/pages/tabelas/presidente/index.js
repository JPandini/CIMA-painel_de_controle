import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/style-tabelas.css';
import { toast } from 'react-toastify';
import { usePresidente } from '../../../context/PresidenteContext';

function PresidenteHome() {
  const { idBairroPresidente } = usePresidente(); 
  const [bairros, setBairros] = useState([]); 
  const [clientes, setClientes] = useState([]);
  const [searchNome, setSearchNome] = useState('');
  const [filteredClientes, setFilteredClientes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://cima-production.up.railway.app/presidente/');
      setClientes(response.data);
      setFilteredClientes(response.data);
    }

    fetchData();

    axios.get('https://cima-production.up.railway.app/bairro') 
    .then((response) => {
      setBairros(response.data); 
    })
    .catch((error) => {
      console.error('Erro ao buscar cidades:', error);
    });
  }, []);

  useEffect(() => {
    const filtered = clientes.filter(cliente =>
      cliente.nome && cliente.nome.toLowerCase().includes(searchNome.toLowerCase())
    );

    // Se idBairroPresidente existir, filtre por codbairro
    if (idBairroPresidente) {
      setFilteredClientes(filtered.filter(cliente => cliente.codbairro === idBairroPresidente));
    } else {
      setFilteredClientes(filtered);
    }

  }, [searchNome, clientes, idBairroPresidente]);

  const handleDelete = async (id) => {
    if (!isNaN(id)) {
      try {
        const response = await axios.delete(`https://cima-production.up.railway.app/presidente/${id}`);
        console.log('Item deletado com sucesso!', response.data);
        toast.warn("Presidente deletado com sucesso!")
        setClientes((prevClientes) => prevClientes.filter((cliente) => cliente.id !== id));

      } catch (error) {
        console.error('Erro ao deletar o item:', error);
      }
    } else {
      console.error('ID inválido:', id);
    }
  };

  return (
    <div className="client-list-container">
      <h1 className="main-heading">Lista de Clientes</h1>
      <div className="client-list-container_head">
        <input 
          type="text"
          placeholder="Pesquisar por nome"
          value={searchNome}
          onChange={(e) => setSearchNome(e.target.value)}
          className="search-input"
        />
        <button onClick={() => setSearchNome('')} className="clear-button">Limpar</button>
      </div>
      {!idBairroPresidente && <Link className='link-cadastro' to={"/cadastropresidente"}>Cadastrar</Link>}
      <ul className="client-list">
        {filteredClientes.map(cliente => (
          <article key={cliente.id} className="client-item">
            <li className='nome'> {cliente.id} - {cliente.nome}  ({cliente.usuario}) - {cliente.email} -{' '}
            {bairros.map((bairro) => {
              while (bairro.id === cliente.codbairro){
                return <p className='paragrafo' key={cliente.codbairro}>{bairro.nome}</p>
              }
              return null;
            })}
            </li>
            <Link className='link-update' to={`/updatepresidente/${cliente.id}`}>Update</Link>
            <button className='link-delete' onClick={() => handleDelete(cliente.id)}>Deletar</button>
          </article>
        ))}
      </ul>
    </div>
  );
}

export default PresidenteHome;
