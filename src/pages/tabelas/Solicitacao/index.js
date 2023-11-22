import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SolicitacaoHome() {
  const [bairros, setBairros] = useState([]) 
  const [clientes, setClientes] = useState([]);
  const [searchNome, setSearchNome] = useState('');
  const [filteredClientes, setFilteredClientes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://cima-production.up.railway.app/usuario_temp');
        setClientes(response.data);
        setFilteredClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
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
        const response = await axios.delete(`https://cima-production.up.railway.app/usuario_temp/${id}`);
        console.log('Item deletado com sucesso!', response.data);
        // Atualizando a lista de clientes filtrados
        setFilteredClientes(filteredClientes.filter(cliente => cliente.id !== id));
        alert("Usuário recusado com sucesso!");
      } catch (error) {
        console.error('Erro ao deletar o item:', error);
      }
    } else {
      console.error('ID inválido:', id);
    }
  };

  const handleDeleteAndAccept = async (id, cliente) => {
    if (!isNaN(id)) {
      try {
        // Fazendo um POST na tabela usuario
        const responsePost = await axios.post('https://cima-production.up.railway.app/usuario', {
          // Inclua aqui as propriedades que deseja adicionar à tabela usuario
          nome: cliente.nome, 
          usuario: cliente.usuario,
          senha: cliente.senha,
          email: cliente.email,
          cpf: cliente.cpf,
          numero_casa: cliente.numero_casa,
          rua: cliente.rua,
          complemento: cliente.complemento,
          codbairro: cliente.codbairro
        });

        // Deletando da tabela usuario_temp
        const responseDelete = await axios.delete(`https://cima-production.up.railway.app/usuario_temp/${id}`);

        console.log('Item aceito e deletado com sucesso!', responsePost.data, responseDelete.data);
        // Atualizando a lista de clientes filtrados
        setFilteredClientes(filteredClientes.filter(item => item.id !== id));
        alert("Usuário aceito com sucesso!");
      } catch (error) {
        console.error('Erro ao aceitar e deletar o item:', error);
      }
    } else {
      console.error('ID inválido:', id);
    }
  };

  return (
    <div className="client-list-container">
      <h1 className="main-heading">Aceitar Usuários</h1>
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
      
      <ul className="client-list">
        {filteredClientes.map(cliente => (
          <article key={cliente.id} className="client-item">
            <li className='nome'> {cliente.id} - {cliente.nome} ({cliente.usuario}) - {cliente.email} -{' '}
            {bairros.map((bairro) => {
              while (bairro.id === cliente.codbairro){
                return <p className='paragrafo' key={cliente.codbairro}>{bairro.nome}</p>
              }
              return null;
            })}

            </li>
            <button className='link-update' onClick={() => handleDeleteAndAccept(cliente.id, cliente)}>
            Aceitar
            </button>

            <button className='link-delete' onClick={() => handleDelete(cliente.id)}>
             Recusar
            </button>
          </article>
        ))}
      </ul>
    </div>
  );
}

export default SolicitacaoHome;