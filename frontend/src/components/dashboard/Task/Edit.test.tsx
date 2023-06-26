import { screen, render, fakeTasks, fireEvent } from 'test-utils'

import Edit from './Edit'

describe('Edit', () => {
  it('Save button should be disabled if the title is invalid', () => {
    const onSave = jest.fn()
    const onCancel = jest.fn()
    const saveTextToStore = jest.fn()

    render(
      <Edit
        title=""
        isLoading={false}
        onSave={onSave}
        onCancel={onCancel}
        saveTextToStore={saveTextToStore}
      />
    )
    // update input
    const newInputVal = 'Ta'
    const input = screen.getByPlaceholderText(/task title/i)
    fireEvent.change(input, { target: { value: newInputVal } })
    // confirm that input value is updated
    expect(input).toHaveValue(newInputVal)
    // save button should be disabled
    const saveBtn = screen.getByText(/save/i)
    expect(saveBtn).toBeDisabled()
  })

  it('Save button should be enabled if the title is valid', () => {
    const onSave = jest.fn()
    const onCancel = jest.fn()
    const saveTextToStore = jest.fn()

    render(
      <Edit
        title=""
        isLoading={false}
        onSave={onSave}
        onCancel={onCancel}
        saveTextToStore={saveTextToStore}
      />
    )
    // update input
    const newInputVal = 'Task'
    const input = screen.getByPlaceholderText(/task title/i)
    fireEvent.change(input, { target: { value: newInputVal } })
    expect(input).toHaveValue(newInputVal)
    // save button should be enabled
    const saveBtn = screen.getByText(/save/i)
    expect(saveBtn).toBeEnabled()

    // click save button
    fireEvent.click(saveBtn)
    // onSave should be called
    expect(onSave).toHaveBeenCalledTimes(1)
  })

  it('Should call the onCancel function when the cancel button is clicked', () => {
    const onSave = jest.fn()
    const onCancel = jest.fn()
    const saveTextToStore = jest.fn()

    render(
      <Edit
        title=""
        isLoading={false}
        onSave={onSave}
        onCancel={onCancel}
        saveTextToStore={saveTextToStore}
      />
    )

    const cancelBtn = screen.getByText(/cancel/i)
    fireEvent.click(cancelBtn)
    // onCancel should be called
    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('Should display Create btn when creatingTask is passed', () => {
    const onSave = jest.fn()
    const onCancel = jest.fn()
    const saveTextToStore = jest.fn()

    render(
      <Edit
        title=""
        isLoading={false}
        onSave={onSave}
        onCancel={onCancel}
        saveTextToStore={saveTextToStore}
        creatingTask
      />
    )

    const createBtn = screen.getByText(/create/i)
    expect(createBtn).toBeInTheDocument()
    expect(createBtn).toBeDisabled()

    // update input
    const newInputVal = 'Task'
    const input = screen.getByPlaceholderText(/task title/i)
    fireEvent.change(input, { target: { value: newInputVal } })

    // create button should be enabled
    expect(createBtn).toBeEnabled()
  })
})
