import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { useSelector, useDispatch } from 'react-redux'

import { setActiveTask } from 'store/dashSlice'
import type { RootState } from 'store'
import type { Task as TaskType } from 'Types'
import { useUpdateTaskMutation } from 'services/tasks'
import { TaskElement, DeleteBtn, SaveBtn, InputField } from './Task.styles'

type Props = {
  task: TaskType
}

const Task = ({ task }: Props) => {
  const activeTask = useSelector((state: RootState) => state.dash.activeTask)
  const dispatch = useDispatch()

  const [inputValue, setInputValue] = useState<string>(task.title || '')

  const [updateTask, { isLoading }] = useUpdateTaskMutation()

  const saveTask = async () => {
    if (inputValue === task.title) {
      dispatch(setActiveTask(null))

      return
    }

    await updateTask({ id: task.id, title: inputValue })
    dispatch(setActiveTask(null))
  }

  return (
    <div>
      <TaskElement
        status={task.status}
        elevation={3}
        onDoubleClick={() => dispatch(setActiveTask(task.id))}
      >
        {activeTask !== task.id && (
          <DeleteBtn className="delete-task-btn">
            <CloseIcon />
          </DeleteBtn>
        )}
        {activeTask === task.id ? (
          <>
            <InputField
              label=""
              value={inputValue}
              multiline
              placeholder="Task title"
              rows={2}
              variant="standard"
              fullWidth
              onChange={e => setInputValue(e.target.value)}
              InputProps={{
                disableUnderline: true,
              }}
              disabled={isLoading}
              onKeyDown={e => e.key === 'Enter' && saveTask()}
            />
            <SaveBtn variant="text" fullWidth onClick={saveTask} disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : 'Save'}
            </SaveBtn>
          </>
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
