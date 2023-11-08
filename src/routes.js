import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import CadastroAdmin from "./pages/Cadastro";
import Home from "./pages/Home"


import CidadeHome from "./pages/tabelas/cidade/index";
import BairroHome from "./pages/tabelas/bairro/index";
import GrupoHome from "./pages/tabelas/grupo/index";
import MensagemHome from "./pages/tabelas/mensagem/index";
import PostagemHome from "./pages/tabelas/postagem";
import PresidenteHome from "./pages/tabelas/presidente";
import UsuarioHome from "./pages/tabelas/usuario";


import CadastroCidade from "./pages/tabelas/cidade/cadastro";
import CadastroBairro from "./pages/tabelas/bairro/cadastro";
import CadastroGrupo from "./pages/tabelas/grupo/cadastro";
import CadastroMensagem from "./pages/tabelas/mensagem/cadastro";
import CadastroPostagem from "./pages/tabelas/postagem/cadastro";
import CadastroPresidente from "./pages/tabelas/presidente/cadastro";
import CadastroUsuario from "./pages/tabelas/usuario/cadastro";


import UpdateCidade from "./pages/tabelas/cidade/update";
import UpdateBairro from "./pages/tabelas/bairro/update";
import UpdatePresidente from "./pages/tabelas/presidente/update";

import Header from "./components/Header";


function RouteApp(){
return(
<BrowserRouter>
<Header/>
    <Routes>
        <Route path="/login" element={ <Login/> }/>
        <Route path="/cadastro" element={ <CadastroAdmin/> } />
        <Route path="/" element={ <Home/> }/>

        <Route path="/cidade" element={ <CidadeHome/> }/>
        <Route path="/bairro" element={ <BairroHome/> }/>
        <Route path="/grupo" element={ <GrupoHome/> }/>
        <Route path="/mensagem" element={ <MensagemHome/> }/>
        <Route path="/postagem" element={ <PostagemHome/> }/>
        <Route path="/presidente" element={ <PresidenteHome/> }/>
        <Route path="/usuario" element={ <UsuarioHome/> }/>

        <Route path="/cadastrocidade" element={ <CadastroCidade/> }/>
        <Route path="/cadastrobairro" element={ <CadastroBairro/> }/>
        <Route path="/cadastrogrupo" element={ <CadastroGrupo/> }/>
        <Route path="/cadastromensagem" element={ <CadastroMensagem/> }/>
        <Route path="/cadastropostagem" element={ <CadastroPostagem/> }/>
        <Route path="/cadastropresidente" element={ <CadastroPresidente/> }/>
        <Route path="/cadastrousuario" element={ <CadastroUsuario/> }/>

        <Route path="/updatecidade/:id" element={ <UpdateCidade/> }/>
        <Route path="/updatebairro/:id" element={ <UpdateBairro/> }/>
        <Route path="/updatepresidente/:id" element={ <UpdatePresidente/> }/>



    </Routes>
</BrowserRouter>
    )
}
export default RouteApp;