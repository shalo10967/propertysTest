import { useState, useEffect } from 'react'
import Navigation from '../components/organisms/Navigation/Navigation'
import OwnerCard from '../components/molecules/OwnerCard/OwnerCard'
import OwnerForm from '../components/molecules/OwnerForm/OwnerForm'
import Button from '../components/atoms/Button/Button'
import { ownerService } from '../services/api'
import './OwnersPage.css'

const OwnersPage = () => {
  const [owners, setOwners] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedOwner, setSelectedOwner] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOwners()
  }, [])

  const fetchOwners = async () => {
    try {
      const response = await ownerService.getAll()
      setOwners(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching owners:', error)
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setSelectedOwner(null)
    setShowForm(true)
  }

  const handleEdit = (owner) => {
    setSelectedOwner(owner)
    setShowForm(true)
  }

  const handleSubmit = async (data) => {
    try {
      if (selectedOwner) {
        await ownerService.update(selectedOwner.idOwner, data)
      } else {
        await ownerService.create(data)
      }
      fetchOwners()
      setShowForm(false)
      setSelectedOwner(null)
    } catch (error) {
      console.error('Error saving owner:', error)
      alert('Error al guardar el propietario. Por favor intenta de nuevo.')
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setSelectedOwner(null)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este propietario?')) {
      try {
        await ownerService.delete(id)
        fetchOwners()
      } catch (error) {
        console.error('Error deleting owner:', error)
        alert('Error al eliminar el propietario. Por favor intenta de nuevo.')
      }
    }
  }

  return (
    <div className="owners-page">
      <Navigation />
      <div className="container">
        <div className="page-header">
          <h1>Gestión de Propietarios</h1>
          {!showForm && (
              <Button onClick={handleCreate}>
              Nuevo Propietario
            </Button>
          )}
        </div>
        
        {showForm ? (
          <OwnerForm
            owner={selectedOwner}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <>
            {loading ? (
              <div className="loading">Cargando...</div>
            ) : (
              <div className="owners-list">
                {owners.length === 0 ? (
                  <div className="empty-state">No hay propietarios disponibles</div>
                ) : (
                  owners.map(owner => (
                    <OwnerCard
                      key={owner.idOwner}
                      owner={owner}
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

export default OwnersPage

