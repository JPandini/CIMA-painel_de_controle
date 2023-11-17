import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './home.css';

function Home()  {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/'); // Redirecionar para a tela de login se o token não estiver presente
        }
        else{
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        // Implemente a lógica de logout, removendo o token do armazenamento local, etc.
        localStorage.removeItem('token');
        navigate('/login'); // Redirecionar para a tela de login após o logout
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