import Navbar from './Navbar'
import { render, screen } from '@testing-library/react'

describe('Navbar', () => {
  it('Renders correctly', () => {
    render(<Navbar />)
    expect(screen.getByText('Gastfreund')).toBeInTheDocument()
  })
})
