import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)
    
    fireEvent.click(screen.getByText('Click Me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies primary variant class', () => {
    render(<Button variant="primary">Primary</Button>)
    const button = screen.getByText('Primary')
    expect(button).toHaveClass('btn-primary')
  })

  it('applies secondary variant class', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByText('Secondary')
    expect(button).toHaveClass('btn-secondary')
  })

  it('applies danger variant class', () => {
    render(<Button variant="danger">Danger</Button>)
    const button = screen.getByText('Danger')
    expect(button).toHaveClass('btn-danger')
  })

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByText('Disabled')
    expect(button).toBeDisabled()
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByText('Custom')
    expect(button).toHaveClass('btn')
    expect(button).toHaveClass('custom-class')
  })
})

