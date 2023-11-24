import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/style-tabelas.css';
import { toast } from 'react-toastify'


function CidadeHome() {
  const [clientes, setClientes] = useState([]);
  const [searchNome, setSearchNome] = useState('');
  const [filteredClientes, setFilteredClientes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://cima-production.up.railway.app/cidade/');
      setClientes(response.data);
      setFilteredClientes(response.data);
      
    }

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = clientes.filter(cliente =>
      cliente.nome.toLowerCase().includes(searchNome.toLowerCase())
    );
    setFilteredClientes(filtered);
    
  }, [searchNome, clientes]);

  const handleDelete = async (id) => {
    if (!isNaN(id)) {
      try {
        const response = await axios.delete(`https://cima-production.up.railway.app/cidade/${id}`);
        console.log('Item deletado com sucesso!', response.data);
        toast.warn("Cidade deletada com sucesso!")
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
      <h1 className="main-heading">Lista de Cidades</h1>
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
      {filteredClientes.length === 0 && <span className='span-nenhuma'> Nenhuma solicitação enviada! </span>}

      <Link className='link-cadastro' to={"/cadastrocidade"}>Cadastrar</Link>
      <ul className="client-list">
        {filteredClientes.map(cliente => (
          <article key={cliente.id} className="client-item">
            <li className='nome'> {cliente.id} - {cliente.nome} </li>
            <Link className='link-update' to={`/updatecidade/${cliente.id}`}>Update</Link>
            <button className='link-delete' onClick={() => handleDelete(cliente.id)}>Deletar</button>
          </article>
        ))}
      </ul>
    </div>
  );
}

export default CidadeHome;
