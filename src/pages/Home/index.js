import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { MdLocationCity } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { TbUsersPlus } from "react-icons/tb";
import axios from "axios";
import { Chart } from "react-google-charts";
import { usePresidente } from "../../context/PresidenteContext";

import './home.css';

function Home() {
  const navigate = useNavigate();
  const [dados, setDados] = useState({ usuariosCadastrados: 0, presidentesCadastrados: 0 });
  const { idBairroPresidente } = usePresidente();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        if (!token) {
          // Se não houver token, redirecione para a página de login
          navigate('/login');
          return;
        }

        // Verifica se o usuário está autenticado
        await axios.get('https://cima-production.up.railway.app/dados-autenticados', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Se a verificação passar, então busca os dados do gráfico
        let response;
        if (idBairroPresidente) {
          // Se idBairroPresidente existir, busca o número de usuários do seu bairro
          response = await axios.get(`https://cima-production.up.railway.app/dadosGrafico/${idBairroPresidente}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          // Se idBairroPresidente não existir, assume que é um administrador e busca o número geral de usuários
          response = await axios.get('https://cima-production.up.railway.app/dadosGrafico', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        console.log('Data fetched successfully:', response.data);
        setDados(response.data);
      } catch (error) {
        console.error('Erro ao obter dados para o gráfico:', error);
        // Em caso de erro, redirecione para a página de login
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate, idBairroPresidente]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const usuariosNaoNulos = Array.isArray(dados.usuariosCadastrados)
    ? dados.usuariosCadastrados.filter(usuario => usuario.nome !== null)
    : [];

  const presidentesNaoNulos = Array.isArray(dados.presidentesCadastrados)
    ? dados.presidentesCadastrados.filter(presidente => presidente.nome !== null)
    : [];

  const totalUsuarios = usuariosNaoNulos.length;
  const totalPresidente = presidentesNaoNulos.length;

  const data = [
    ['Tipo', 'Quantidade'],
    ['Usuários', totalUsuarios],
    ['Presidentes', totalPresidente],
  ];

  return (
    <div className="container">
      <div className="tabelas">
        <h3 className="titulo-tabelas">TABELAS</h3>
        <ul className="lista-banco">
          <li className="lista-bairro"><Link to={"/bairro"} className="links"><FaLocationDot /> BAIRROS</Link></li>
          {!idBairroPresidente &&<li className="lista-cidade"><Link to={"/cidade"} className="links"><MdLocationCity /> CIDADES</Link></li>}
          <li className="lista-postagens"><Link to={"/postagem"} className="links"><AiTwotoneEdit /> POSTAGENS</Link></li>
          <li className="lista-presidente"><Link to={"/presidente"} className="links"><RiAdminLine /> PRESIDENTES</Link></li>
          <li className="lista-usuario"><Link to={"/usuario"} className="links"><FaRegUser /> USUARIOS</Link></li>
          <li className="lista-solicitacao"><Link to={"/solicitacao"} className="links"><TbUsersPlus /> SOLICITAÇÕES</Link></li>
        </ul>
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
          />
        </div>

        <button onClick={handleLogout} className="logout-button"><IoIosLogOut /> Logout</button>
      </div>
    </div>
  );
}

export default Home;
