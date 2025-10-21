import { useState, useEffect } from 'react'
import Navigation from '../components/organisms/Navigation/Navigation'
import PropertyTraceCard from '../components/molecules/PropertyTraceCard/PropertyTraceCard'
import PropertyTraceForm from '../components/molecules/PropertyTraceForm/PropertyTraceForm'
import Button from '../components/atoms/Button/Button'
import { propertyTraceService, propertyService } from '../services/api'
import './PropertyTracesPage.css'

const PropertyTracesPage = () => {
  const [traces, setTraces] = useState([])
  const [properties, setProperties] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedTrace, setSelectedTrace] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filterProperty, setFilterProperty] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [tracesResponse, propertiesResponse] = await Promise.all([
        propertyTraceService.getAll(),
        propertyService.getAll()
      ])
      setTraces(tracesResponse.data)
      setProperties(propertiesResponse.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setSelectedTrace(null)
    setShowForm(true)
  }

  const handleEdit = (trace) => {
    setSelectedTrace(trace)
    setShowForm(true)
  }

  const handleSubmit = async (data) => {
    try {
      if (selectedTrace) {
        await propertyTraceService.update(selectedTrace.idPropertyTrace, data)
      } else {
        await propertyTraceService.create(data)
      }
      fetchData()
      setShowForm(false)
      setSelectedTrace(null)
    } catch (error) {
      console.error('Error saving trace:', error)
      alert('Error al guardar el seguimiento. Por favor intenta de nuevo.')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este seguimiento?')) {
      try {
        await propertyTraceService.delete(id)
        fetchData()
      } catch (error) {
        console.error('Error deleting trace:', error)
        alert('Error al eliminar el seguimiento. Por favor intenta de nuevo.')
      }
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setSelectedTrace(null)
  }

  const getPropertyById = (idProperty) => {
    return properties.find(p => p.idProperty === idProperty)
  }

  const filteredTraces = filterProperty
    ? traces.filter(t => t.idProperty === filterProperty)
    : traces

  const totalValue = filteredTraces.reduce((sum, t) => sum + (t.value || 0), 0)
  const totalTax = filteredTraces.reduce((sum, t) => sum + (t.tax || 0), 0)
  const grandTotal = totalValue + totalTax

  return (
    <div className="property-traces-page">
      <Navigation />
      <div className="container">
        <div className="page-header">
          <div className="header-content">
            <h1>Gestión de Propiedades</h1>
          </div>
          {!showForm && (
            <Button onClick={handleCreate} variant="primary">
              Nuevo Seguimiento
            </Button>
          )}
        </div>

        {showForm ? (
          <PropertyTraceForm
            trace={selectedTrace}
            properties={properties}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <div className="traces-header">
              <div className="filter-section">
                <label htmlFor="filter-property" className="filter-label">
                  Filtrar por propiedad:
                </label>
                <select
                  id="filter-property"
                  value={filterProperty}
                  onChange={(e) => setFilterProperty(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Todas las propiedades</option>
                  {properties.map(property => (
                    <option key={property.idProperty} value={property.idProperty}>
                      {property.name}
                    </option>
                  ))}
                </select>
              </div>

              {filteredTraces.length > 0 && (
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">📈</div>
                    <div className="stat-content">
                      <div className="stat-label">Total Seguimientos</div>
                      <div className="stat-value">{filteredTraces.length}</div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-content">
                      <div className="stat-label">Valor Total</div>
                      <div className="stat-value">
                        ${totalValue.toLocaleString('es-CO')}
                      </div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">🧾</div>
                    <div className="stat-content">
                      <div className="stat-label">Impuestos</div>
                      <div className="stat-value">
                        ${totalTax.toLocaleString('es-CO')}
                      </div>
                    </div>
                  </div>
                  <div className="stat-card highlight">
                    <div className="stat-icon">💵</div>
                    <div className="stat-content">
                      <div className="stat-label">Total General</div>
                      <div className="stat-value">
                        ${grandTotal.toLocaleString('es-CO')}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {loading ? (
              <div className="loading">⏳ Cargando seguimientos...</div>
            ) : (
              <div className="traces-list">
                {filteredTraces.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">📊</div>
                    <h3>No hay seguimientos disponibles</h3>
                    <p>
                      {filterProperty
                        ? 'No hay seguimientos para esta propiedad'
                        : 'Crea tu primer seguimiento para comenzar'}
                    </p>
                    {!filterProperty && (
                      <Button onClick={handleCreate} variant="primary">
                        Crear Seguimiento
                      </Button>
                    )}
                  </div>
                ) : (
                  filteredTraces.map(trace => (
                    <PropertyTraceCard
                      key={trace.idPropertyTrace}
                      trace={trace}
                      property={getPropertyById(trace.idProperty)}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default PropertyTracesPage

