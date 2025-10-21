import { useState, useEffect } from 'react'
import Input from '../../atoms/Input/Input'
import Button from '../../atoms/Button/Button'
import PriceRangeSlider from '../../atoms/PriceRangeSlider/PriceRangeSlider'
import { propertyService } from '../../../services/api'
import './PropertyFilters.css'

const PropertyFilters = ({ onFilterChange, onClearFilters }) => {
  const [filters, setFilters] = useState({
    name: '',
    address: '',
    priceRange: { min: 0, max: 10000000 }
  })
  
  const [priceStats, setPriceStats] = useState({
    min: 0,
    max: 10000000
  })

  useEffect(() => {
    fetchPriceStats()
  }, [])

  const fetchPriceStats = async () => {
    try {
      const response = await propertyService.getAll()
      const properties = response.data
      
      if (properties.length > 0) {
        const prices = properties.map(p => p.price)
        const minPrice = Math.floor(Math.min(...prices) / 100000) * 100000
        const maxPrice = Math.ceil(Math.max(...prices) / 100000) * 100000
        
        setPriceStats({ min: minPrice, max: maxPrice })
        setFilters(prev => ({
          ...prev,
          priceRange: { min: minPrice, max: maxPrice }
        }))
      }
    } catch (error) {
      console.error('Error fetching price stats:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePriceRangeChange = (range) => {
    setFilters(prev => ({
      ...prev,
      priceRange: range
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const cleanFilters = {}

    if (filters.name && filters.name.trim()) {
      cleanFilters.name = filters.name.trim()
    }

    if (filters.address && filters.address.trim()) {
      cleanFilters.address = filters.address.trim()
    }
    
    if (filters.priceRange.min > priceStats.min) {
      cleanFilters.minPrice = filters.priceRange.min
    }
    
    if (filters.priceRange.max < priceStats.max) {
      cleanFilters.maxPrice = filters.priceRange.max
    }
    
    console.log('Enviando filtros:', cleanFilters)
    onFilterChange(cleanFilters)
  }

  const handleClear = () => {
    setFilters({
      name: '',
      address: '',
      priceRange: { min: priceStats.min, max: priceStats.max }
    })
    onClearFilters()
  }

  const hasActiveFilters = 
    (filters.name && filters.name.trim()) || 
    (filters.address && filters.address.trim()) || 
    filters.priceRange.min > priceStats.min || 
    filters.priceRange.max < priceStats.max

  return (
    <form className="property-filters" onSubmit={handleSubmit}>
      <div className="filters-header">
        <h3 className="filters-title">Filtrar Propiedades</h3>
        {hasActiveFilters && (
          <button 
            type="button" 
            className="clear-all-btn"
            onClick={handleClear}
          >
            Limpiar Filtros
          </button>
        )}
      </div>

      <div className="filters-grid">
        <div className="filter-item">
          <Input
            label="Nombre de la Propiedad"
            name="name"
            value={filters.name}
            onChange={handleChange}
            placeholder="Ej: Casa en el Centro"
          />
        </div>

        <div className="filter-item">
          <Input
            label="Dirección"
            name="address"
            value={filters.address}
            onChange={handleChange}
            placeholder="Ej: Medellín, Colombia"
          />
        </div>

      </div>

      <div className="price-filter-section">
        <PriceRangeSlider
          label="Rango de Precio"
          min={priceStats.min}
          max={priceStats.max}
          step={100000}
          value={filters.priceRange}
          onChange={handlePriceRangeChange}
        />
      </div>

      <div className="filters-actions">
        <Button type="submit" variant="primary">
          Aplicar Filtros
        </Button>
        {hasActiveFilters && (
          <Button type="button" variant="secondary" onClick={handleClear}>
            Limpiar
          </Button>
        )}
      </div>
    </form>
  )
}

export default PropertyFilters

