import React from "react";
import { Link } from "react-router-dom";
import './home.css'

function Home()  {

    return(
        <div className="tabelas">
        <h3 className="titulo-tabelas">Tabelas</h3>
        <ul className="lista-banco">
            <li className="lista-bairro"><Link to={"/bairro"} className="links">bairro</Link></li>
            <li className="lista-cidade">cidade</li>
            <li className="lista-endereco">endereco</li>
            <li className="lista-grupo">grupo</li>
            <li className="lista-mensagens">mensagens</li>
            <li className="lista-postagens">postagens</li>
            <li className="lista-presidente">presidente</li>
            <li className="lista-usuario">usuario</li>
        </ul>
        </div>
    );
}

export default Home;