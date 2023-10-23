import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home"

import CidadeHome from "./pages/tabelas/cidade/index";
import BairroHome from "./pages/tabelas/bairro/index";
import EnderecoHome from "./pages/tabelas/endereco/index";
import GrupoHome from "./pages/tabelas/grupo/index";
import MensagemHome from "./pages/tabelas/mensagem/index";
import PostagemHome from "./pages/tabelas/postagem";
import PresidenteHome from "./pages/tabelas/presidente";
import UsuarioHome from "./pages/tabelas/usuario";


import CadastroCidade from "./pages/tabelas/cidade/cadastro";
import CadastroBairro from "./pages/tabelas/bairro/cadastro";
import CadastroEndereco from "./pages/tabelas/endereco/cadastro";
import CadastroGrupo from "./pages/tabelas/grupo/cadastro";
import CadastroMensagem from "./pages/tabelas/mensagem/cadastro";
import CadastroPostagem from "./pages/tabelas/postagem/cadastro";
import CadastroPresidente from "./pages/tabelas/presidente/cadastro";
import CadastroUsuario from "./pages/tabelas/usuario/cadastro";


import UpdateCidade from "./pages/tabelas/cidade/update";


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
        <Route path="/postagem" element={ <PostagemHome/> }/>
        <Route path="/presidente" element={ <PresidenteHome/> }/>
        <Route path="/usuario" element={ <UsuarioHome/> }/>

        <Route path="/cadastrocidade" element={ <CadastroCidade/> }/>
        <Route path="/cadastrobairro" element={ <CadastroBairro/> }/>
        <Route path="/cadastroendereco" element={ <CadastroEndereco/> }/>
        <Route path="/cadastrogrupo" element={ <CadastroGrupo/> }/>
        <Route path="/cadastromensagem" element={ <CadastroMensagem/> }/>
        <Route path="/cadastropostagem" element={ <CadastroPostagem/> }/>
        <Route path="/cadastropresidente" element={ <CadastroPresidente/> }/>
        <Route path="/cadastrousuario" element={ <CadastroUsuario/> }/>

        <Route path="/updatecidade/:id" element={ <UpdateCidade/> }/>



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