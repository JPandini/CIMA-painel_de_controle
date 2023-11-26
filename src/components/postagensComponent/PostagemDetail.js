import React from 'react';
import '../../pages/tabelas/postagem/postagem.css'

const PostagemDetail = ({ postagem, handleDelete }) => {
  const decodeBase64Image = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div className='geral-postagem'>
    <article className="client-item-postagem">
      <li className='nome-postagem'>{postagem.titulo}</li>
      <img src={decodeBase64Image(postagem.imagem)} alt="Imagem da Postagem" />
      <li className='nome-postagem'>{postagem.descricao}</li>
      <button className='link-delete-postagem' onClick={() => handleDelete(postagem.id)}>Deletar</button>
    </article>
    </div>
  );
};

export default PostagemDetail;
