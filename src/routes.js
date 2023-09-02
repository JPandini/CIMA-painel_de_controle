import { BrowserRouter, Routes, Route } from "react-router-dom";

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