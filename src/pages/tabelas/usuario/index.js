import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { usePresidente } from '../../../context/PresidenteContext';
import '../style/style-tabelas.css';

function UsuarioHome() {
  const { idBairroPresidente } = usePresidente();
  const [bairros, setBairros] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [searchNome, setSearchNome] = useState('');
  const [filteredClientes, setFilteredClientes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://cima-production.up.railway.app/usuario/');
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
    setFilteredClientes(filtered);
  }, [searchNome, clientes]);

  const handleDelete = async (id) => {
    if (!isNaN(id)) {
      try {
        const response = await axios.delete(`https://cima-production.up.railway.app/usuario/${id}`);
        console.log('Item deletado com sucesso!', response.data);
        toast.warn("Usuario deletado com sucesso!")
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
      {filteredClientes.length === 0 && <span className='span-nenhuma'> Nenhum usuário cadastrado! </span>}

      <ul className="client-list">
        {filteredClientes.map(cliente => {
          const isPresidente = idBairroPresidente !== null;
          const showCliente =
            (isPresidente && cliente.codbairro === idBairroPresidente) || !isPresidente;

          return showCliente ? (
            <article key={cliente.id} className="client-item">
              <li className='nome'>
                {cliente.id} - {cliente.nome} ({cliente.usuario}) - {cliente.email} -{' '}
                {bairros.map((bairro) => {
                  return bairro.id === cliente.codbairro ? (
                    <p className='paragrafo' key={cliente.codbairro}>{bairro.nome}</p>
                  ) : null;
                })}
              </li>
              <Link className='link-update' to={`/updateusuario/${cliente.id}`}>Update</Link>
              <button className='link-delete' onClick={() => handleDelete(cliente.id)}>Deletar</button>
            </article>
          ) : null;
        })}
      </ul>
    </div>
  );
}

export default UsuarioHome;
