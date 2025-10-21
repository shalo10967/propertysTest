import Card from '../../atoms/Card/Card'
import Button from '../../atoms/Button/Button'
import './OwnerCard.css'

const OwnerCard = ({ owner, onEdit, onDelete }) => {
  return (
    <Card className="owner-card">
      <div className="owner-content">
        {owner.photo && (
          <div className="owner-photo-container">
            <img 
              src={owner.photo} 
              alt={owner.name} 
              className="owner-photo"
            />
          </div>
        )}
        <div className="owner-info">
          <h3 className="owner-name">{owner.name}</h3>
          {owner.address && (
            <p className="owner-detail">
              <strong>Dirección:</strong> {owner.address}
            </p>
          )}
          {owner.birthday && (
            <p className="owner-detail">
              <strong>Cumpleaños:</strong> {new Date(owner.birthday).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          )}
        </div>
      </div>
      <div className="owner-actions">
        <Button variant="primary" onClick={() => onEdit(owner)}>
          Editar
        </Button>
        <Button variant="danger" onClick={() => onDelete(owner.idOwner)}>
          Eliminar
        </Button>
      </div>
    </Card>
  )
}

export default OwnerCard

