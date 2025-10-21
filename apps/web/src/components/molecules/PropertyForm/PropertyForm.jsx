import { useState, useEffect } from 'react'
import Input from '../../atoms/Input/Input'
import Button from '../../atoms/Button/Button'
import OwnerSelector from '../OwnerSelector/OwnerSelector'
import './PropertyForm.css'

const PropertyForm = ({ property, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    price: '',
    codeInternal: '',
    year: '',
    idOwner: ''
  })

  useEffect(() => {
    if (property) {
      setFormData(property)
    }
  }, [property])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleOwnerSelect = (ownerId) => {
    setFormData(prev => ({
      ...prev,
      idOwner: ownerId
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.idOwner) {
      alert('Por favor selecciona un propietario')
      return
    }
    
    onSubmit(formData)
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <Input
        label="Nombre de la Propiedad"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Dirección"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <Input
        label="Precio"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <Input
        label="Código Interno"
        name="codeInternal"
        value={formData.codeInternal}
        onChange={handleChange}
        required
      />
      <Input
        label="Año"
        name="year"
        type="number"
        value={formData.year}
        onChange={handleChange}
        required
      />
      
      <OwnerSelector
        selectedOwnerId={formData.idOwner}
        onSelectOwner={handleOwnerSelect}
        label="Propietario *"
      />
      
      <div className="form-actions">
        <Button type="submit" variant="primary">
          {property ? 'Actualizar' : 'Crear'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}

export default PropertyForm

