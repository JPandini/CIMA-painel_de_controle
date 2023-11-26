import { Link } from 'react-router-dom'
import './style.css';

function Header(){
    return(
    <header>
        <Link className='botao' to="/">Painel de controle</Link>
    </header>
    )
}
export default Header