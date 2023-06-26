import { screen, render, fakeTasks, fireEvent } from 'test-utils'

import Task from './Task'

describe('Task', () => {
  it('Renders correctly', () => {
    const task = fakeTasks[0]
    render(<Task task={task} globalLoading={false} />)
    expect(screen.getByText(task.title)).toBeInTheDocument()
  })

  it('Displays the delete button on hover', () => {
    const task = fakeTasks[0]
    render(<Task task={task} globalLoading={false} />)

    // const taskElement = container.querySelector(`div[status=${task.status}]`)
    const taskEl = screen.getByTestId('task')
    // hover over task
    fireEvent.mouseEnter(taskEl)
    // find delete button
    const deleteBtn = screen.getByLabelText(/delete task/i)
    expect(deleteBtn).toBeInTheDocument()
  })

  it('Displays the delete dialog when delete button is clicked', () => {
    const task = fakeTasks[0]
    render(<Task task={task} globalLoading={false} />)
    // hover over task
    const taskEl = screen.getByTestId('task')
    fireEvent.mouseEnter(taskEl)
    // click delete button
    const deleteBtn = screen.getByLabelText(/delete task/i)
    expect(deleteBtn).toBeInTheDocument()
    fireEvent.click(deleteBtn)
    // dialog should be visible
    const deleteDialogTitle = screen.getByText(/delete task/i)
    expect(deleteDialogTitle).toBeInTheDocument()
    const deleteDialogText = screen.getByText(/are you sure you want/i)
    expect(deleteDialogText).toBeInTheDocument()
  })

  it('Should switch to edit mode when double clicked', () => {
    const task = fakeTasks[0]
    render(<Task task={task} globalLoading={false} />)
    // double click
    fireEvent.doubleClick(screen.getByText(task.title))
    // input should be visible
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    // placeholder text should be hidden
    const taskTitleEl = screen.queryByTestId('task-title')
    expect(taskTitleEl).not.toBeInTheDocument()

    // it should hide the input when cancel btn is clicked
    const cancelBtn = screen.getByText(/cancel/i)
    fireEvent.click(cancelBtn)
    // input should be hidden
    expect(input).not.toBeInTheDocument()
  })
})
