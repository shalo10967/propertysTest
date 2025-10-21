import { useState, useEffect } from 'react'
import Navigation from '../components/organisms/Navigation/Navigation'
import PropertyList from '../components/organisms/PropertyList/PropertyList'
import PropertyForm from '../components/molecules/PropertyForm/PropertyForm'
import PropertyFilters from '../components/molecules/PropertyFilters/PropertyFilters'
import Button from '../components/atoms/Button/Button'
import { propertyService, propertyImageService } from '../services/api'
import './PropertiesPage.css'

const PropertiesPage = () => {
  const [properties, setProperties] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState({})

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async (filters = {}) => {
    setLoading(true)
    try {
      const response = await propertyService.getAll(filters)
      const propertiesData = response.data
      
      const propertiesWithImages = await Promise.all(
        propertiesData.map(async (property) => {
          try {
            const imagesResponse = await propertyImageService.getByPropertyId(property.idProperty)
            return {
              ...property,
              images: imagesResponse.data || []
            }
          } catch (error) {
            console.error(`Error fetching images for property ${property.idProperty}:`, error)
            return {
              ...property,
              images: []
            }
          }
        })
      )
      
      setProperties(propertiesWithImages)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching properties:', error)
      setLoading(false)
    }
  }

  const handleFilterChange = (filters) => {
    setActiveFilters(filters)
    fetchProperties(filters)
  }

  const handleClearFilters = () => {
    setActiveFilters({})
    fetchProperties({})
  }

  const handleCreate = () => {
    setSelectedProperty(null)
    setShowForm(true)
  }

  const handleEdit = (property) => {
    setSelectedProperty(property)
    setShowForm(true)
  }

  const handleSubmit = async (data) => {
    try {
      if (selectedProperty) {
        await propertyService.update(selectedProperty.idProperty, data)
      } else {
        await propertyService.create(data)
      }
      fetchProperties()
      setShowForm(false)
      setSelectedProperty(null)
    } catch (error) {
      console.error('Error saving property:', error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta propiedad?')) {
      try {
        await propertyService.delete(id)
        fetchProperties()
      } catch (error) {
        console.error('Error deleting property:', error)
      }
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setSelectedProperty(null)
  }

  return (
    <div className="properties-page">
      <Navigation />
      <div className="container">
        <div className="page-header">
          <h1>Propiedades</h1>
          {!showForm && (
              <Button onClick={handleCreate}>
              Nueva Propiedad
            </Button>
          )}
        </div>
        
        {showForm ? (
          <PropertyForm
            property={selectedProperty}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <PropertyFilters
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
            
            {loading ? (
              <div className="loading">Cargando...</div>
            ) : (
              <>
                {Object.keys(activeFilters).length > 0 && (
                  <div className="filter-results-info">
                    <span>
                      {properties.length} {properties.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
                    </span>
                  </div>
                )}
                <PropertyList
                  properties={properties}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default PropertiesPage

