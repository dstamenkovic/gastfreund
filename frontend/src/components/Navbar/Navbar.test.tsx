import Navbar from './Navbar'
import { render, screen, fireEvent } from 'test-utils'

describe('Navbar', () => {
  it('Renders correctly', () => {
    render(<Navbar />)

    expect(screen.getByText('Gastfreund')).toBeInTheDocument()

    const searchInput = screen.getByPlaceholderText('Search…')
    expect(searchInput).toBeInTheDocument()

    const darkModeBtn = screen.getByLabelText('dark mode')
    expect(darkModeBtn).toBeInTheDocument()
  })

  it('Searches for tasks', () => {
    render(<Navbar />)
    const searchInput = screen.getByPlaceholderText('Search…')
    fireEvent.focus(searchInput)
    fireEvent.change(searchInput, { target: { value: 'test' } })
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' })
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('Should not search with less than 2 characters', () => {
    render(<Navbar />)
    const searchInput = screen.getByPlaceholderText('Search…')
    fireEvent.focus(searchInput)
    fireEvent.change(searchInput, { target: { value: 't' } })
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' })
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })
})
