import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PropertiesPage from './pages/PropertiesPage'
import OwnersPage from './pages/OwnersPage'
import PropertyTracesPage from './pages/PropertyTracesPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/owners" element={<OwnersPage />} />
        <Route path="/traces" element={<PropertyTracesPage />} />
      </Routes>
    </Router>
  )
}

export default App

