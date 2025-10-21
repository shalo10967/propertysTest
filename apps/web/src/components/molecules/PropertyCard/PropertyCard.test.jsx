import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PropertyCard from './PropertyCard'

describe('PropertyCard Component', () => {
  const mockProperty = {
    idProperty: '1',
    name: 'Test Property',
    address: '123 Test St',
    price: 250000,
    year: 2020,
    codeInternal: 'PROP-001',
    images: [
      { file: 'https://example.com/image1.jpg', enabled: true },
      { file: 'https://example.com/image2.jpg', enabled: false }
    ]
  }

  it('renders property information', () => {
    render(
      <PropertyCard
        property={mockProperty}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    )

    expect(screen.getByText('Test Property')).toBeInTheDocument()
    expect(screen.getByText(/123 Test St/)).toBeInTheDocument()
    expect(screen.getByText(/\$250,000/)).toBeInTheDocument()
    expect(screen.getByText(/2020/)).toBeInTheDocument()
    expect(screen.getByText(/PROP-001/)).toBeInTheDocument()
  })

  it('displays first enabled image', () => {
    render(
      <PropertyCard
        property={mockProperty}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    )

    const image = screen.getByAltText('Test Property')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg')
  })

  it('calls onEdit when edit button is clicked', () => {
    const handleEdit = vi.fn()
    render(
      <PropertyCard
        property={mockProperty}
        onEdit={handleEdit}
        onDelete={() => {}}
      />
    )

    fireEvent.click(screen.getByText('Editar'))
    expect(handleEdit).toHaveBeenCalledWith(mockProperty)
  })

  it('calls onDelete when delete button is clicked', () => {
    const handleDelete = vi.fn()
    render(
      <PropertyCard
        property={mockProperty}
        onEdit={() => {}}
        onDelete={handleDelete}
      />
    )

    fireEvent.click(screen.getByText('Eliminar'))
    expect(handleDelete).toHaveBeenCalledWith('1')
  })

  it('renders without images', () => {
    const propertyWithoutImages = { ...mockProperty, images: [] }
    render(
      <PropertyCard
        property={propertyWithoutImages}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    )

    expect(screen.queryByAltText('Test Property')).not.toBeInTheDocument()
    expect(screen.getByText('Test Property')).toBeInTheDocument()
  })
})

