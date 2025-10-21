import { useState, useEffect, useCallback } from 'react'
import Modal from '../../atoms/Modal/Modal'
import Input from '../../atoms/Input/Input'
import Button from '../../atoms/Button/Button'
import { ownerService } from '../../../services/api'
import './OwnerSelector.css'

const OwnerSelector = ({ selectedOwnerId, onSelectOwner, label = "Propietario" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [owners, setOwners] = useState([])
  const [filteredOwners, setFilteredOwners] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOwner, setSelectedOwner] = useState(null)
  const [loading, setLoading] = useState(false)
  const [ownersLoaded, setOwnersLoaded] = useState(false)

  const fetchOwners = useCallback(async () => {
    if (ownersLoaded) return
    
    setLoading(true)
    try {
      const response = await ownerService.getAll()
      setOwners(response.data)
      setFilteredOwners(response.data)
      setOwnersLoaded(true)
    } catch (error) {
      console.error('Error fetching owners:', error)
    } finally {
      setLoading(false)
    }
  }, [ownersLoaded])

  useEffect(() => {
    if (selectedOwnerId && !ownersLoaded) {
      fetchOwners()
    }
  }, [selectedOwnerId, ownersLoaded, fetchOwners])

  useEffect(() => {
    if (selectedOwnerId && owners.length > 0) {
      const owner = owners.find(o => o.idOwner === selectedOwnerId)
      setSelectedOwner(owner || null)
    } else if (!selectedOwnerId) {
      setSelectedOwner(null)
    }
  }, [selectedOwnerId, owners])

  useEffect(() => {
    if (isModalOpen && !ownersLoaded) {
      fetchOwners()
    }
  }, [isModalOpen, ownersLoaded, fetchOwners])

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredOwners(owners)
    } else {
      const filtered = owners.filter(owner =>
        owner.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredOwners(filtered)
    }
  }, [searchTerm, owners])

  const handleSelectOwner = (owner) => {
    setSelectedOwner(owner)
    onSelectOwner(owner.idOwner, owner.name)
    setIsModalOpen(false)
    setSearchTerm('')
  }

  const handleClearSelection = () => {
    setSelectedOwner(null)
    onSelectOwner('', '')
  }

  return (
    <div className="owner-selector">
      <label className="input-label">{label}</label>
      
      <div className="owner-selector-display">
        {selectedOwner ? (
          <div className="selected-owner-info">
            {selectedOwner.photo && (
              <img 
                src={selectedOwner.photo} 
                alt={selectedOwner.name}
                className="selected-owner-photo"
              />
            )}
            <div className="selected-owner-details">
              <strong>{selectedOwner.name}</strong>
              {selectedOwner.address && (
                <span className="selected-owner-address">{selectedOwner.address}</span>
              )}
            </div>
            <button 
              type="button"
              className="clear-selection-btn"
              onClick={handleClearSelection}
              title="Limpiar selección"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="no-owner-selected">
            <span>Ningún propietario seleccionado</span>
          </div>
        )}
        
        <Button 
          type="button" 
          variant="primary" 
          onClick={() => setIsModalOpen(true)}
        >
          {selectedOwner ? 'Cambiar Propietario' : 'Seleccionar Propietario'}
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Seleccionar Propietario"
      >
        <div className="owner-selector-modal">
          <Input
            label="Buscar por nombre"
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Escribe el nombre del propietario..."
          />

          <div className="owners-list-modal">
            {loading ? (
              <div className="loading-modal">Cargando propietarios...</div>
            ) : filteredOwners.length === 0 ? (
              <div className="no-results">
                {searchTerm ? 'No se encontraron propietarios con ese nombre' : 'No hay propietarios disponibles'}
              </div>
            ) : (
              filteredOwners.map(owner => (
                <div
                  key={owner.idOwner}
                  className={`owner-item ${selectedOwner?.idOwner === owner.idOwner ? 'selected' : ''}`}
                  onClick={() => handleSelectOwner(owner)}
                >
                  {owner.photo && (
                    <img 
                      src={owner.photo} 
                      alt={owner.name}
                      className="owner-item-photo"
                    />
                  )}
                  <div className="owner-item-info">
                    <strong className="owner-item-name">{owner.name}</strong>
                    {owner.address && (
                      <span className="owner-item-address">{owner.address}</span>
                    )}
                  </div>
                  {selectedOwner?.idOwner === owner.idOwner && (
                    <span className="check-icon">✓</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default OwnerSelector

