import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home"

import CidadeHome from "./pages/tabelas/cidade/index";
import BairroHome from "./pages/tabelas/bairro/index";
import EnderecoHome from "./pages/tabelas/endereco/index";
import GrupoHome from "./pages/tabelas/grupo/index";
import MensagemHome from "./pages/tabelas/mensagem/index";

import ClientList from "./pages/Listar";
import Cadastro from "./pages/Cadastro";
import ListaId from "./pages/ListaId";
import UpdatePage from "./pages/Up";
import DeletePage from "./pages/Delete";


import Header from "./components/Header";


function RouteApp(){
return(
<BrowserRouter>
<Header/>
    <Routes>
        <Route path="/" element={ <Home/> }/>
        <Route path="/cidade" element={ <CidadeHome/> }/>
        <Route path="/bairro" element={ <BairroHome/> }/>
        <Route path="/endereco" element={ <EnderecoHome/> }/>
        <Route path="/grupo" element={ <GrupoHome/> }/>
        <Route path="/mensagem" element={ <MensagemHome/> }/>




        <Route path="/listar" element={ <ClientList/> }/>
        <Route path="/cadastro" element={ <Cadastro/> }/>
        <Route path="/lista/:id" element={ <ListaId/> }/>
        <Route path="/update/:id" element={ <UpdatePage/> }/>
        <Route path="/delete/:id" element={ <DeletePage/> }/>

    </Routes>
</BrowserRouter>
    )
}
export default RouteApp;