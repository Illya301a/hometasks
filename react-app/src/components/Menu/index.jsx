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
                        🏠 Home
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/about" 
                        className="nav-link"
                    >
                        ℹ️ About
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/contacts" 
                        className="nav-link"
                    >
                        📞 Contacts
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Menu