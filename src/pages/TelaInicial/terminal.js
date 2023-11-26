import React from "react";
import "./terminal.css";
import { Link } from 'react-router-dom'

function TelaInicial(){


return (

  <div className="conteiner"> 
    <div className="fundo">
      <div className="caixa-texto"> 
        <p className="texto-bemvindo"> Bem vindo! </p>
        <p className="texto-prosseguir"> Como deseja prosseguir? </p>
      </div>

        <Link to={'/login'} className="botao-adm">Administrador</Link>
        <Link to={'/loginpresidente'} className="botao-presidente">Presidente</Link>

    </div>

  </div>

                 



);

}


export default TelaInicial;