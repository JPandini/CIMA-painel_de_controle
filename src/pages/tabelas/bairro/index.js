import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/style-tabelas.css';
import { toast } from 'react-toastify';
import { usePresidente } from '../../../context/PresidenteContext';

function BairroHome() {
  const { idBairroPresidente } = usePresidente();
  const [cidades, setCidades] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [searchNome, setSearchNome] = useState('');
  const [filteredClientes, setFilteredClientes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://cima-production.up.railway.app/bairro');
      setClientes(response.data);
      setFilteredClientes(response.data);
    }

    axios.get('https://cima-production.up.railway.app/cidade')
      .then((response) => {
        setCidades(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar cidades:', error);
      });

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = clientes.filter((cliente) =>
      cliente.nome.toLowerCase().includes(searchNome.toLowerCase())
    );

    // Se idBairroPresidente existir, filtre por idBairroPresidente
    if (idBairroPresidente) {
      setFilteredClientes(filtered.filter(cliente => cliente.id === idBairroPresidente));
    } else {
      setFilteredClientes(filtered);
    }

  }, [searchNome, clientes, idBairroPresidente]);

  const handleDelete = async (id) => {
    if (!isNaN(id)) {
      try {
        const response = await axios.delete(`https://cima-production.up.railway.app/bairro/${id}`);
        console.log('Item deletado com sucesso!', response.data);
        toast.warn("Bairro deletado com sucesso!")
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
      <h1 className="main-heading">Lista de Bairro</h1>
      <div className="client-list-container_head">
        <input
          type="text"
          placeholder="Pesquisar por nome"
          value={searchNome}
          onChange={(e) => setSearchNome(e.target.value)}
          className="search-input"
        />
        <button onClick={() => setSearchNome('')} className="clear-button">
          Limpar
        </button>
      </div>
      {filteredClientes.length === 0 && <span className='span-nenhuma'> Nenhuma solicitação enviada! </span>}

      {!idBairroPresidente && <Link className='link-cadastro' to="/cadastrobairro">Cadastrar</Link>}
      <ul className="client-list">
        {filteredClientes.map((cliente) => (
          <article key={cliente.id} className="client-item">
            <li className='nome'> 
              {cliente.id} - {cliente.nome} -{' '}
              {cidades.map((cidade) => {
                while (cidade.id === cliente.codcidade) {
                  return <p className='paragrafo' key={cliente.codcidade}>{cidade.nome}</p>;
                }
                return null;
              })}
            </li>
            <Link className='link-update' to={`/updatebairro/${cliente.id}`}>Update</Link>
            <button className='link-delete' onClick={() => handleDelete(cliente.id)}>Deletar</button>
          </article>
        ))}
      </ul>
    </div>
  );
}

export default BairroHome;
