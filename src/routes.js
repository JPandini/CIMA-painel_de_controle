import { BrowserRouter, Routes, Route } from "react-router-dom";

import ClientList from "./pages/Listar";


function RouteApp(){
return(
<BrowserRouter>
    <Routes>

        <Route path="/" element={ <ClientList/> }/>

    </Routes>
</BrowserRouter>
    )
}
export default RouteApp;