import Card from '../../atoms/Card/Card'
import Button from '../../atoms/Button/Button'
import './PropertyCard.css'

const PropertyCard = ({ property, onEdit, onDelete }) => {
  const mainImage = property.images?.find(img => img.enabled) || property.images?.[0]
  
  return (
    <Card className="property-card">
      {mainImage && (
        <div className="property-image-container">
          <img 
            src={mainImage.file} 
            alt={property.name}
            className="property-image"
          />
        </div>
      )}
      <div className="property-content">
        <h3 className="property-name">{property.name}</h3>
        <div className="property-details">
          <p><strong>Dirección:</strong> {property.address}</p>
          <p><strong>Precio:</strong> ${property.price?.toLocaleString()}</p>
          <p><strong>Año:</strong> {property.year}</p>
          <p><strong>Código:</strong> {property.codeInternal}</p>
        </div>
        <div className="property-actions">
          <Button variant="primary" onClick={() => onEdit(property)}>
            Editar
          </Button>
          <Button variant="danger" onClick={() => onDelete(property.idProperty)}>
            Eliminar
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default PropertyCard

