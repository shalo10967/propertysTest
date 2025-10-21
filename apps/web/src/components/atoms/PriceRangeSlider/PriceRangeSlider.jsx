import { useState, useEffect } from 'react'
import './PriceRangeSlider.css'

const PriceRangeSlider = ({ min = 0, max = 10000000, step = 100000, value, onChange, label }) => {
  const [minValue, setMinValue] = useState(value?.min || min)
  const [maxValue, setMaxValue] = useState(value?.max || max)

  useEffect(() => {
    if (value) {
      setMinValue(value.min || min)
      setMaxValue(value.max || max)
    }
  }, [value, min, max])

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), maxValue - step)
    setMinValue(newMin)
    onChange({ min: newMin, max: maxValue })
  }

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), minValue + step)
    setMaxValue(newMax)
    onChange({ min: minValue, max: newMax })
  }

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    }
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }
  
  const formatPriceFull = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const getPercentage = (value, min, max) => {
    return ((value - min) / (max - min)) * 100
  }

  const minPercent = getPercentage(minValue, min, max)
  const maxPercent = getPercentage(maxValue, min, max)

  return (
    <div className="price-range-slider">
      {label && <label className="slider-label">{label}</label>}
      
      <div className="slider-values">
        <div className="value-box">
          <span className="value-label">Mínimo</span>
          <span className="value-display">{formatPriceFull(minValue)}</span>
        </div>
        <span className="value-separator">—</span>
        <div className="value-box">
          <span className="value-label">Máximo</span>
          <span className="value-display">{formatPriceFull(maxValue)}</span>
        </div>
      </div>

      <div className="slider-container">
        <div className="slider-track">
          <div 
            className="slider-range"
            style={{
              left: `${minPercent}%`,
              right: `${100 - maxPercent}%`
            }}
          />
        </div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          className="slider-input slider-input-min"
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          className="slider-input slider-input-max"
        />
      </div>

      <div className="slider-limits">
        <span className="limit-min">{formatPrice(min)}</span>
        <span className="limit-max">{formatPrice(max)}</span>
      </div>
    </div>
  )
}

export default PriceRangeSlider

