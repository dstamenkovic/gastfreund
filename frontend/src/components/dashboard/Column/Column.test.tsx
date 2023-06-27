import Column from './Column'
import { render, screen, fakeTasks, fireEvent } from 'test-utils'

describe('Column', () => {
  it('Renders correctly', () => {
    render(<Column status="to-do" tasks={fakeTasks} />)
    // should render title
    expect(screen.getByText(/to do/i)).toBeInTheDocument()
    // should display count
    expect(screen.getByText(`(${fakeTasks.length})`)).toBeInTheDocument()
    // should render all tasks
    expect(screen.getAllByTestId('task-wrapper').length).toBe(fakeTasks.length)
    // should render add task button
    expect(screen.getByLabelText('add task')).toBeInTheDocument()
  })

  it('Renders "no tasks" message', () => {
    render(<Column status="to-do" tasks={[]} />)
    expect(screen.getByText(/no tasks/i)).toBeInTheDocument()
  })

  it('Displays "add task" component', () => {
    render(<Column status="to-do" tasks={[]} />)
    const addBtn = screen.getByLabelText('add task')
    fireEvent.click(addBtn)
    expect(screen.getByTestId('add-task-wrapper')).toBeInTheDocument()
    // addBtn should be disabled
    expect(addBtn).toBeDisabled()

    // should hide "add task" component when clicked on the cancel button
    const cancelBtn = screen.getByText(/cancel/i)
    fireEvent.click(cancelBtn)
    expect(screen.queryByTestId('add-task-wrapper')).not.toBeInTheDocument()
  })
})
