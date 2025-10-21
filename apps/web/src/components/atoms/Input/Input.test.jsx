import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Input from './Input'

describe('Input Component', () => {
  it('renders input with label', () => {
    render(<Input label="Name" name="name" />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('calls onChange handler when value changes', () => {
    const handleChange = vi.fn()
    render(<Input label="Name" name="name" onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'John' } })
    expect(handleChange).toHaveBeenCalled()
  })

  it('displays current value', () => {
    render(<Input label="Name" name="name" value="John Doe" onChange={() => {}} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('John Doe')
  })

  it('can be required', () => {
    render(<Input label="Name" name="name" required />)
    const input = screen.getByRole('textbox')
    expect(input).toBeRequired()
  })

  it('supports different types', () => {
    const { rerender } = render(<Input label="Email" name="email" type="email" />)
    let input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'email')

    rerender(<Input label="Password" name="password" type="password" />)
    input = screen.getByLabelText('Password')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('shows placeholder text', () => {
    render(<Input label="Name" name="name" placeholder="Enter your name" />)
    const input = screen.getByPlaceholderText('Enter your name')
    expect(input).toBeInTheDocument()
  })
})

