import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './postagem.css'
import PostagemDetail from '../../../components/postagensComponent/PostagemDetail';

function PostagemHome() {
  const [postagens, setPostagens] = useState([]);
  const [searchNome, setSearchNome] = useState('');
  const [filteredPostagens, setFilteredPostagens] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://cima-production.up.railway.app/postagem');
      setPostagens(response.data);
      setFilteredPostagens(response.data);
    }

    fetchData(); 
  }, []);

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
        alert("Usuário deletado com sucesso!")
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
        <button onClick={() => setSearchNome('')} className="clear-button">Limpar</button>
      </div>
      {filteredPostagens.length === 0 && <span className='span-nenhuma'>Nenhuma postagem cadastrada!</span>}

      
      <ul className="client-list-postagem">
        {filteredPostagens.map(postagem => (
          <PostagemDetail key={postagem.id} postagem={postagem} handleDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

export default PostagemHome;