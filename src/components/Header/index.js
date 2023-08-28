import { Link } from 'react-router-dom'
import './style.css';

function Header(){
    return(
    <header>
        <Link className='botao' to="/">Menu</Link>
        <Link className='botao' to="/cadastro">Cadastro</Link>
        <Link className='botao' to="/listar">Clientes</Link>
    </header>
    )
}
export default Header