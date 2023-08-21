import { BrowserRouter, Routes, Route } from "react-router-dom";

import ClientList from "./pages/Listar";
import Cadastro from "./pages/Cadastro";
import ListaId from "./pages/ListaId";

function RouteApp(){
return(
<BrowserRouter>
    <Routes>

        <Route path="/listar" element={ <ClientList/> }/>
        <Route path="/cadastro" element={ <Cadastro/> }/>
        <Route path="/lista/:id" element={ <ListaId/> }/>


    </Routes>
</BrowserRouter>
    )
}
export default RouteApp;