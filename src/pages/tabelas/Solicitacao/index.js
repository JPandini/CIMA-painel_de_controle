import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/style-tabelas.css';
import { usePresidente } from '../../../context/PresidenteContext';
import { toast } from 'react-toastify';

function SolicitacaoHome() {
  const [bairros, setBairros] = useState([]) 
  const [clientes, setClientes] = useState([]);
  const [searchNome, setSearchNome] = useState('');
  const [filteredClientes, setFilteredClientes] = useState([]);
  const { idBairroPresidente } = usePresidente(); 

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
    cliente.nome && cliente.nome.toLowerCase().includes(searchNome.toLowerCase()) &&
    (idBairroPresidente ? cliente.codbairro === idBairroPresidente : true)
  );
    setFilteredClientes(filtered);

  }, [searchNome,idBairroPresidente, clientes]);

  const handleDelete = async (id) => {
    if (!isNaN(id)) {
      try {
        const response = await axios.delete(`https://cima-production.up.railway.app/usuario_temp/${id}`);
        console.log('Item deletado com sucesso!', response.data);
        // Atualizando a lista de clientes filtrados
        setFilteredClientes(filteredClientes.filter(cliente => cliente.id !== id));
        toast.warn("Usuário recusado com sucesso!");
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
          codbairro: cliente.codbairro,
          imagem: cliente.imagem
        });

          const responseTemporario = await axios.post('https://cima-production.up.railway.app/usuario_temp',{
            email: cliente.email
          }
          );

          console.log('Dados do cliente:', cliente);


        const responseDelete = await axios.delete(`https://cima-production.up.railway.app/usuario_temp/${id}`);

        console.log('Item aceito e deletado com sucesso!', responsePost.data, responseTemporario.data, responseDelete.data);
        setFilteredClientes(filteredClientes.filter(item => item.id !== id));
        toast.success("Usuário aceito com sucesso!");
      } catch (error) {
        console.error('Erro ao aceitar e deletar o item:', error);
        console.error('Detalhes da resposta do servidor:', error.response);

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
      
      {filteredClientes.length === 0 && <span className='span-nenhuma'> Nenhuma solicitação enviada! </span>}

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