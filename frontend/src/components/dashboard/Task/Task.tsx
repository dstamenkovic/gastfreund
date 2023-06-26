import { useCallback } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { useSelector, useDispatch } from 'react-redux'

import { setActiveTaskID, removeActiveTaskData, setActiveTaskText } from 'store/dashSlice'
import type { RootState } from 'store'
import type { Task as TaskType } from 'Types'
import { useUpdateTaskMutation } from 'services/tasks'
import { TaskElement, DeleteBtn } from './Task.styles'
import Edit from './Edit'

type Props = {
  task: TaskType
}

const Task = ({ task }: Props) => {
  const activeTaskID = useSelector((state: RootState) => state.dash.activeTaskID)
  const activeTaskText = useSelector((state: RootState) => state.dash.activeTaskText)
  const dispatch = useDispatch()
  const [updateTask, { isLoading }] = useUpdateTaskMutation()

  const dataPersisted = activeTaskText && activeTaskID === task.id

  const saveTextToStore = useCallback(
    (inputVal: string) => {
      dispatch(setActiveTaskText(inputVal))
    },
    [dispatch]
  )

  const saveTask = async (inputVal: string) => {
    if (inputVal === task.title) {
      dispatch(removeActiveTaskData())
      return
    }
    await updateTask({ id: task.id, title: inputVal })
    dispatch(removeActiveTaskData())
  }

  const onCancel = () => {
    dispatch(removeActiveTaskData())
  }

  return (
    <div>
      <TaskElement
        status={task.status}
        elevation={activeTaskID === task.id ? 7 : 3}
        onDoubleClick={() => dispatch(setActiveTaskID(task.id))}
      >
        {activeTaskID !== task.id && (
          <DeleteBtn className="delete-task-btn">
            <CloseIcon />
          </DeleteBtn>
        )}
        {activeTaskID === task.id ? (
          <Edit
            isLoading={isLoading}
            title={dataPersisted ? activeTaskText : task.title}
            onSave={saveTask}
            onCancel={onCancel}
            saveTextToStore={saveTextToStore}
          />
        ) : (
          <Typography variant="h6" component="h6">
            {task.title}
          </Typography>
        )}
      </TaskElement>
    </div>
  )
}

export default Task
