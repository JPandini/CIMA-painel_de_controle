import React from "react";
import "./terminal.css";


function TelaInicial(){


return (

  <div className="conteiner"> 
    <div className="fundo">
      <div className="caixa-texto"> 
        <p className="texto-bemvindo"> Bem vindo! </p>
        <p className="texto-prosseguir"> Como deseja prosseguir? </p>
      </div>
        <button className="botao-adm" type="submit">
          Login Administrador
        </button>
        
        <button className="botao-presidente" type="submit">
          Login Presidente
        </button>

    </div>

  </div>

                 



);

}


export default TelaInicial;