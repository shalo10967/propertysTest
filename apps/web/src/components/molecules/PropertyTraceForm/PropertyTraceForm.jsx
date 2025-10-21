import { useState, useEffect } from 'react'
import Input from '../../atoms/Input/Input'
import Button from '../../atoms/Button/Button'
import './PropertyTraceForm.css'

const PropertyTraceForm = ({ trace, properties, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateSale: '',
    value: '',
    tax: '',
    idProperty: ''
  })

  useEffect(() => {
    if (trace) {
      const dateValue = trace.dateSale ? 
        new Date(trace.dateSale).toISOString().split('T')[0] : ''
      
      setFormData({
        ...trace,
        dateSale: dateValue
      })
    }
  }, [trace])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.idProperty) {
      alert('Por favor selecciona una propiedad')
      return
    }
    
    const submitData = {
      ...formData,
      value: parseFloat(formData.value),
      tax: parseFloat(formData.tax),
      dateSale: new Date(formData.dateSale).toISOString()
    }
    
    onSubmit(submitData)
  }

  const selectedProperty = properties.find(p => p.idProperty === formData.idProperty)
  const total = parseFloat(formData.value || 0) + parseFloat(formData.tax || 0)

  return (
    <form className="property-trace-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>{trace ? 'Editar Seguimiento' : 'Nuevo Seguimiento'}</h2>
      </div>

      <div className="form-grid">
        <div className="form-group full-width">
          <label className="form-label">Propiedad *</label>
          <select
            name="idProperty"
            value={formData.idProperty}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Selecciona una propiedad</option>
            {properties.map(property => (
              <option key={property.idProperty} value={property.idProperty}>
                {property.name} - {property.address}
              </option>
            ))}
          </select>
          {selectedProperty && (
            <div className="selected-property-info">
              <span className="property-badge">
                🏠 {selectedProperty.name}
              </span>
              <span className="property-price">
                💰 ${selectedProperty.price?.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        <Input
          label="Nombre del Seguimiento"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Ej: Venta, Alquiler mensual, etc."
        />

        <Input
          label="Fecha"
          name="dateSale"
          type="date"
          value={formData.dateSale}
          onChange={handleChange}
          required
        />

        <Input
          label="Valor"
          name="value"
          type="number"
          value={formData.value}
          onChange={handleChange}
          required
          placeholder="0"
        />

        <Input
          label="Impuesto"
          name="tax"
          type="number"
          value={formData.tax}
          onChange={handleChange}
          required
          placeholder="0"
        />
      </div>

      {(formData.value || formData.tax) && (
        <div className="total-section">
          <div className="total-label">💵 Total:</div>
          <div className="total-value">
            ${total.toLocaleString('es-CO', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}
          </div>
        </div>
      )}

      <div className="form-actions">
        <Button type="submit" variant="primary">
          {trace ? 'Actualizar' : 'Crear'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}

export default PropertyTraceForm

