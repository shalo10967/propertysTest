import { Link } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <ul className="nav-menu">
          <li><Link to="/" className="nav-link">Inicio</Link></li>
          <li><Link to="/properties" className="nav-link">Propiedades</Link></li>
          <li><Link to="/owners" className="nav-link">Propietarios</Link></li>
          <li><Link to="/traces" className="nav-link">Seguimiento</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation

