import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { MdLocationCity } from "react-icons/md";
import { BsChatRightDots } from "react-icons/bs";
import { AiTwotoneEdit } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { TbUsersPlus } from "react-icons/tb";
import axios from "axios";
import { Chart } from "react-google-charts";


import './home.css';

function Home() {
  const navigate = useNavigate();
  const [dados, setDados] = useState({ usuariosCadastrados: 0, presidentesCadastrados: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cima-production.up.railway.app/dadosGrafico');
        console.log('Dados recebidos:', response.data);
        setDados(response.data);
      } catch (error) {
        console.error('Erro ao obter dados para o gráfico:', error);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const data = [
    ['Tipo', 'Quantidade'],
    ['Usuários', dados.usuariosCadastrados.length], 
    ['Presidentes', dados.presidentesCadastrados.length], 
  ]
  return (
    <div className="container">
      <div className="tabelas">
      <h3 className="titulo-tabelas">TABELAS</h3>
                <ul className="lista-banco">
                    <li className="lista-bairro"><Link to={"/bairro"} className="links"><FaLocationDot/>  BAIRROS</Link></li>
                    <li className="lista-cidade"><Link to={"/cidade"} className="links" ><MdLocationCity />  CIDADES</Link></li>
                    <li className="lista-mensagens"><Link to={"/mensagem"} className="links"><BsChatRightDots />  MENSAGENS</Link></li>
                    <li className="lista-postagens"><Link to={"/postagem"} className="links"><AiTwotoneEdit />  POSTAGENS</Link></li>
                    <li className="lista-presidente"><Link to={"/presidente"} className="links"><RiAdminLine />  PRESIDENTES</Link></li>
                    <li className="lista-usuario"><Link to={"/usuario"} className="links"><FaRegUser />  USUARIOS</Link></li>
                    <li className="lista-solicitacao"><Link to={"/solicitacao"} className="links"><TbUsersPlus /> SOLICITAÇÕES</Link></li>
                </ul>
                <button onClick={handleLogout} className="logout-button"><IoIosLogOut /> Logout</button>
                <br></br>
      </div>
      <div className="content">
        <h2 className="titulo-Bem">Bem vindo de volta! </h2>
        
        <div className="grafico">
          <Chart
            width={'500px'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Carregando gráfico...</div>}
            data={data}
            options={{
              title: 'Usuários e Presidentes Cadastrados',
              is3D: true, 
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        </div>


          
        
      </div>
    </div>
  );
}

export default Home;
