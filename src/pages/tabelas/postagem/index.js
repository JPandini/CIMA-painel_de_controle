import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './postagem.css';
import PostagemDetail from '../../../components/postagensComponent/PostagemDetail';
import { usePresidente } from '../../../context/PresidenteContext';
import { toast } from 'react-toastify';


function PostagemHome() {
  const [postagens, setPostagens] = useState([]);
  const [searchNome, setSearchNome] = useState('');
  const [filteredPostagens, setFilteredPostagens] = useState([]);
  const { idBairroPresidente } = usePresidente();

  useEffect(() => {
    async function fetchData() {
      try {
        let response;
  
        if (idBairroPresidente) {
          // Se idBairroPresidente existir, busca postagens relacionadas ao bairro
          response = await axios.get(`https://cima-production.up.railway.app/postagem/bairro/${idBairroPresidente}`);
        } else {
          // Se não, busca todas as postagens
          response = await axios.get('https://cima-production.up.railway.app/postagem');
        }
  
        setPostagens(response.data);
        setFilteredPostagens(response.data);
      } catch (error) {
        console.error('Erro ao obter postagens:', error);
      }
    }
  
    fetchData();
  }, [idBairroPresidente]); 

  useEffect(() => {
    const filtered = postagens.filter(postagem =>
      postagem.titulo && postagem.titulo.toLowerCase().includes(searchNome.toLowerCase())
    );
    setFilteredPostagens(filtered);
  }, [searchNome, postagens]);

  const handleDelete = async (id) => {
    if (!isNaN(id)) {
      try {
        const response = await axios.delete(`https://cima-production.up.railway.app/postagem/${id}`);
        console.log('Item deletado com sucesso!', response.data);
        toast.warn('Usuário deletado com sucesso!');
        setPostagens((prevClientes) => prevClientes.filter((cliente) => cliente.id !== id));

      } catch (error) {
        console.error('Erro ao deletar o item:', error);
      }
    } else {
      console.error('ID inválido:', id);
    }
  };

  return (
    <div className="client-list-container-postagem">
      <h1 className="main-heading-postagem">Lista de Postagens</h1>
      <div className="client-list-container_head-postagem">
        <input 
          type="text"
          placeholder="Pesquisar por título"
          value={searchNome}
          onChange={(e) => setSearchNome(e.target.value)}
          className="search-input"
        />
        <button onClick={() => setSearchNome('')} className="clear-button">
          Limpar
        </button>
      </div>
      {filteredPostagens.length === 0 && <span className='span-nenhuma'>Nenhuma publicação feita no momento!</span>}

      <ul className="client-list-postagem">
        {filteredPostagens.map(postagem => (
          <PostagemDetail key={postagem.id} postagem={postagem} handleDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

export default PostagemHome;
