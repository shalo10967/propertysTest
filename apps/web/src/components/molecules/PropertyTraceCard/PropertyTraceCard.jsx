import Card from '../../atoms/Card/Card'
import Button from '../../atoms/Button/Button'
import './PropertyTraceCard.css'

const PropertyTraceCard = ({ trace, property, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <Card className="property-trace-card">
      <div className="trace-header">
        <div className="trace-icon">📊</div>
        <div className="trace-title-section">
          <h3 className="trace-name">{trace.name}</h3>
          {property && (
            <span className="trace-property">🏠 {property.name}</span>
          )}
        </div>
      </div>
      
      <div className="trace-details">
        <div className="trace-detail-item">
          <span className="detail-label">📅 Fecha:</span>
          <span className="detail-value">{formatDate(trace.dateSale)}</span>
        </div>
        <div className="trace-detail-item">
          <span className="detail-label">💰 Valor:</span>
          <span className="detail-value highlight">{formatCurrency(trace.value)}</span>
        </div>
        <div className="trace-detail-item">
          <span className="detail-label">🧾 Impuesto:</span>
          <span className="detail-value">{formatCurrency(trace.tax)}</span>
        </div>
        <div className="trace-detail-item total">
          <span className="detail-label">💵 Total:</span>
          <span className="detail-value total-value">{formatCurrency(trace.value + trace.tax)}</span>
        </div>
      </div>
      
      <div className="trace-actions">
        <Button variant="primary" onClick={() => onEdit(trace)}>
          Editar
        </Button>
        <Button variant="danger" onClick={() => onDelete(trace.idPropertyTrace)}>
          Eliminar
        </Button>
      </div>
    </Card>
  )
}

export default PropertyTraceCard

