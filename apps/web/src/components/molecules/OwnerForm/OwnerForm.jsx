import { useState, useEffect } from 'react'
import Input from '../../atoms/Input/Input'
import Button from '../../atoms/Button/Button'
import './OwnerForm.css'

const OwnerForm = ({ owner, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    photo: '',
    birthday: ''
  })

  useEffect(() => {
    if (owner) {
      let birthdayFormatted = ''
      if (owner.birthday) {
        const date = new Date(owner.birthday)
        birthdayFormatted = date.toISOString().split('T')[0]
      }
      
      setFormData({
        name: owner.name || '',
        address: owner.address || '',
        photo: owner.photo || '',
        birthday: birthdayFormatted
      })
    }
  }, [owner])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const dataToSubmit = {
      ...formData,
      birthday: formData.birthday ? new Date(formData.birthday).toISOString() : null
    }
    onSubmit(dataToSubmit)
  }

  return (
    <form className="owner-form" onSubmit={handleSubmit}>
      <h2>{owner ? 'Editar Propietario' : 'Nuevo Propietario'}</h2>
      
      <Input
        label="Nombre Completo"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Ej: Juan Gabriel Martinez"
        required
      />
      
      <Input
        label="Dirección"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Ej: Calle 123, Medellín, Colombia"
        required
      />
      
      <Input
        label="Fecha de Nacimiento"
        name="birthday"
        type="date"
        value={formData.birthday}
        onChange={handleChange}
        required
      />
      
      <Input
        label="URL de la Foto"
        name="photo"
        type="url"
        value={formData.photo}
        onChange={handleChange}
        placeholder="https://ejemplo.com/foto.jpg"
      />
      
      {formData.photo && (
        <div className="photo-preview">
          <label className="input-label">Vista previa:</label>
          <img 
            src={formData.photo} 
            alt="Preview" 
            className="preview-image"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
      )}
      
      <div className="form-actions">
        <Button type="submit" variant="primary">
          {owner ? 'Actualizar' : 'Crear'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}

export default OwnerForm

