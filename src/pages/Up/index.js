import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdatePage() {
  const { id } = useParams();

  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState();


  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/clientes/${id}`, nome, idade);
      console.log('Atualização realizada com sucesso!', response.data);
    } catch (error) {
      console.error('Erro ao realizar a atualização', error);
    }
  };




  return (
    <div>

      <input placeholder='First Name' onChange={(e) => setNome(e.target.value)}/>


      <input placeholder='Last Name' onChange={(e) => setIdade(e.target.value)}/>


      <button onClick={handleUpdate} type='submit'>Submit</button>

    </div>
  );
}

export default UpdatePage;
