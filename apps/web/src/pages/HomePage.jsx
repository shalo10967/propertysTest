import { useNavigate } from 'react-router-dom'
import Navigation from '../components/organisms/Navigation/Navigation'
import './HomePage.css'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <Navigation />
      <div className="container">
        <div className="hero">
          <h1>Dashboard</h1>
          <p className="hero-subtitle">Bienvenido al sistema de gestión inmobiliaria</p>
          <div className="features">
            <div className="feature-card" onClick={() => navigate('/properties')}>
              <div className="feature-icon">🏠</div>
              <h3>Propiedades</h3>
              <p>Gestionar propiedades</p>
              <span className="feature-arrow">→</span>
            </div>
            <div className="feature-card" onClick={() => navigate('/owners')}>
              <div className="feature-icon">👥</div>
              <h3>Propietarios</h3>
              <p>Administrar propietarios</p>
              <span className="feature-arrow">→</span>
            </div>
            <div className="feature-card" onClick={() => navigate('/traces')}>
              <div className="feature-icon">📊</div>
              <h3>Seguimiento</h3>
              <p>Ventas y alquileres</p>
              <span className="feature-arrow">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

