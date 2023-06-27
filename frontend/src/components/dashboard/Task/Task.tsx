import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { useSelector, useDispatch } from 'react-redux'

import { useUpdateTaskMutation, useDeleteTaskMutation } from 'services/tasks'
import type { RootState } from 'store'
import { setActiveTaskID, removeActiveTaskData, setActiveTaskText } from 'store/dashSlice'
import type { Task as TaskType } from 'Types'
import { TaskElement, DeleteBtn } from './Task.styles'
import Edit from './Edit'
import AlertDialog from 'components/AlertDialog'

type Props = {
  task: TaskType
}

const Task = ({ task }: Props) => {
  const activeTaskID = useSelector((state: RootState) => state.dash.activeTaskID)
  const activeTaskText = useSelector((state: RootState) => state.dash.activeTaskText)
  const dispatch = useDispatch()
  const [updateTask, { isLoading }] = useUpdateTaskMutation()
  const [deleteTask, deleteTaskData] = useDeleteTaskMutation()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const dataPersisted = activeTaskText && activeTaskID === task.id

  const saveTextToStore = (inputVal: string) => {
    dispatch(setActiveTaskText(inputVal))
  }

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

  const handleDelete = async () => {
    await deleteTask({ id: task.id })
    setShowDeleteDialog(false)
  }

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('taskId', task.id)
    e.dataTransfer.setData('taskStatus', task.status)
  }

  return (
    <TaskElement
      status={task.status}
      elevation={activeTaskID === task.id ? 7 : 3}
      onDoubleClick={() => dispatch(setActiveTaskID(task.id))}
      data-testid="task"
      draggable={activeTaskID !== task.id}
      onDragStart={onDragStart}
    >
      {showDeleteDialog && (
        <AlertDialog
          open={showDeleteDialog}
          title="Delete Task"
          text="Are you sure you want to delete this task?"
          handleCancel={() => setShowDeleteDialog(false)}
          handleConfirm={handleDelete}
          loading={deleteTaskData.isLoading}
        />
      )}
      {activeTaskID !== task.id && (
        <DeleteBtn
          className="delete-task-btn"
          onClick={() => setShowDeleteDialog(true)}
          aria-label="delete task"
        >
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
        <Typography variant="h6" component="h6" data-testid="task-title">
          {task.title}
        </Typography>
      )}
    </TaskElement>
  )
}

export default Task
