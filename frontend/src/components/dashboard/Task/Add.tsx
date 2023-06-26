import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import type { RootState } from 'store'
import { useCreateTaskMutation } from 'services/tasks'
import { setCreatingTaskText, removeCreatingTask } from 'store/dashSlice'
import type { Task as TaskType } from 'Types'
import { TaskElement } from './Task.styles'
import Edit from './Edit'

type Props = {
  status: TaskType['status']
  globalLoading: boolean
}

const AddTask = ({ status, globalLoading }: Props) => {
  const creatingTaskIn = useSelector((state: RootState) => state.dash.creatingTaskIn)
  const creatingTaskText = useSelector((state: RootState) => state.dash.creatingTaskText)
  const dispatch = useDispatch()
  const [createTask, { isLoading }] = useCreateTaskMutation()

  const dataPersisted = creatingTaskText && creatingTaskIn === status

  const saveTextToStore = useCallback(
    (inputVal: string) => {
      dispatch(setCreatingTaskText(inputVal))
    },
    [dispatch]
  )

  const saveTask = async (inputVal: string) => {
    if (inputVal.length > 2) {
      await createTask({ title: inputVal, status })
      dispatch(removeCreatingTask())
    }
  }

  const onCancel = () => {
    dispatch(removeCreatingTask())
  }

  return (
    <>
      <TaskElement status={status} elevation={7}>
        <Edit
          title={dataPersisted ? creatingTaskText : ''}
          isLoading={isLoading || globalLoading}
          onSave={saveTask}
          onCancel={onCancel}
          saveTextToStore={saveTextToStore}
          creatingTask
        />
      </TaskElement>
    </>
  )
}

export default AddTask
