import React from "react";
import { Link } from "react-router-dom";
import './home.css'


function Home()  {

    const handleLogout = () => {


    }
    return(
        <div>
        <div className="tabelas">
        <h3 className="titulo-tabelas">Tabelas</h3>
        <ul className="lista-banco">
            <li className="lista-bairro"><Link to={"/bairro"} className="links">bairros</Link></li>
            <li className="lista-cidade"><Link to={"/cidade"} className="links" >cidades</Link></li>
            <li className="lista-grupo"><Link to={"/grupo"} className="links">grupos</Link></li>
            <li className="lista-mensagens"><Link to={"/mensagem"} className="links">mensagens</Link></li>
            <li className="lista-postagens"><Link to={"/postagem"} className="links">postagens</Link></li>
            <li className="lista-presidente"><Link to={"/presidente"} className="links">presidentes</Link></li>
            <li className="lista-usuario"><Link to={"/usuario"} className="links">usuarios</Link></li>
        </ul>
        </div>
        <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;