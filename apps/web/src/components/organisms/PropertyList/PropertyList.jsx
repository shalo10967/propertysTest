import PropertyCard from '../../molecules/PropertyCard/PropertyCard'
import './PropertyList.css'

const PropertyList = ({ properties, onEdit, onDelete }) => {
  if (!properties || properties.length === 0) {
    return <div className="empty-state">No hay propiedades disponibles</div>
  }

  return (
    <div className="property-list">
      {properties.map(property => (
        <PropertyCard
          key={property.idProperty}
          property={property}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default PropertyList

