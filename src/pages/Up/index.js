import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdatePage() {
  const { id } = useParams();

  const [dataToUpdate, setDataToUpdate] = useState({
    nome: '',
    idade: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/clientes/${id}`);
        setDataToUpdate(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados para atualização', error);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/clientes/${id}`, dataToUpdate);
      console.log('Atualização realizada com sucesso!', response.data);
    } catch (error) {
      console.error('Erro ao realizar a atualização', error);
    }
  };

  const handleNomeChange = (e) => {
    setDataToUpdate({ ...dataToUpdate, nome: e.target.value });
  };

  const handleIdadeChange = (e) => {
    setDataToUpdate({ ...dataToUpdate, idade: e.target.value });
  };

  return (
    <div>
      <input
        type='text'
        placeholder='id'
        value={id} // Set the value of the id input field to the id parameter
        readOnly // Make the input field read-only
      />
      <input
        type="text"
        placeholder="Nome"
        value={dataToUpdate.nome}
        onChange={handleNomeChange}
      />
      <input
        type="text"
        placeholder="Idade"
        value={dataToUpdate.idade}
        onChange={handleIdadeChange}
      />
      <button onClick={handleUpdate}>Atualizar</button>
    </div>
  );
}

export default UpdatePage;
