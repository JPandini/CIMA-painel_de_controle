// PostagemDetail.js

import React from 'react';

const PostagemDetail = ({ postagem, handleDelete }) => {
  const decodeBase64Image = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <article className="client-item">
      <li className='nome'>{postagem.id} - {postagem.titulo}</li>
      <img src={decodeBase64Image(postagem.imagem)} alt="Imagem da Postagem" />
      <button className='link-delete' onClick={() => handleDelete(postagem.id)}>Deletar</button>
    </article>
  );
};

export default PostagemDetail;
