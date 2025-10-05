import { NavLink } from 'react-router-dom'

function Menu() {
    return(
        <nav className="navigation">
            <ul className="nav-list">
                <li>
                    <NavLink 
                        to="/" 
                        className="nav-link"
                        end
                    >
                        🏠 Головна
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/about" 
                        className="nav-link"
                    >
                        ℹ️ Про нас
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/contacts" 
                        className="nav-link"
                    >
                        📞 Контакти
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Menu