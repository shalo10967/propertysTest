import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from './Card'

describe('Card Component', () => {
  it('renders children content', () => {
    render(
      <Card>
        <h1>Card Title</h1>
        <p>Card content</p>
      </Card>
    )
    
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <Card className="custom-card">Content</Card>
    )
    
    const card = container.firstChild
    expect(card).toHaveClass('card')
    expect(card).toHaveClass('custom-card')
  })

  it('renders without className', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.firstChild
    expect(card).toHaveClass('card')
  })
})

