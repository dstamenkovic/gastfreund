import Board from './Board'
import { render, screen } from '@testing-library/react'

describe('Board', () => {
  it('Renders all three columns', () => {
    render(<Board tasks={[]} globalLoading={false} />)
    expect(screen.getByText('to do')).toBeInTheDocument()
    expect(screen.getByText('in progress')).toBeInTheDocument()
    expect(screen.getByText('done')).toBeInTheDocument()
  })
})
