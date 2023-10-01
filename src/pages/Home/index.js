import React from "react";
import { Link } from "react-router-dom";
import './home.css'

function Home()  {

    return(
        <div className="tabelas">
        <h3 className="titulo-tabelas">Tabelas</h3>
        <ul className="lista-banco">
            <li className="lista-bairro"><Link to={"/bairro"} className="links">bairros</Link></li>
            <li className="lista-cidade"><Link to={"/cidade"} className="links" >cidades</Link></li>
            <li className="lista-endereco"><Link to={"/endereco"} className="links">enderecos</Link></li>
            <li className="lista-grupo"><Link to={"/grupo"} className="links">grupos</Link></li>
            <li className="lista-mensagens"><Link to={"/mensagem"} className="links">mensagem</Link></li>
            <li className="lista-postagens">postagens</li>
            <li className="lista-presidente">presidentes</li>
            <li className="lista-usuario">usuarios</li>
        </ul>
        </div>
    );
}

export default Home;