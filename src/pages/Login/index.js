import React from "react";
import './login.css'



function Login() {
    return(
        <div className="geral">
        <h2 className="titulo">Login</h2>
        <form className="formulario">
            <input className='input-login' type="email" placeholder="Email"/>
            <input className='input-login' type="password" placeholder="Senha"/>

            <button className='botao-acessar' type="submit">Acessar</button>

        </form>

      </div>
    )
}




export default Login;