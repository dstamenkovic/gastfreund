import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@mui/material/Grid'
import AddIcon from '@mui/icons-material/Add'

import Task from '../Task'
import Add from '../Task/Add'
import { useUpdateTaskMutation } from 'services/tasks'
import type { RootState } from 'store'
import { setCreatingTaskIn } from 'store/dashSlice'
import Loader from 'components/Loader'
import type { Task as TaskType } from 'Types'
import { TitleWrapper, Title, TasksWrapper, AddBtn, Count, NoTasks } from './Column.styles'

type Props = {
  status: 'to-do' | 'in-progress' | 'done'
  tasks: TaskType[]
  globalLoading: boolean
}

const Column = ({ status, tasks, globalLoading }: Props) => {
  const creatingTaskIn = useSelector((state: RootState) => state.dash.creatingTaskIn)
  const dispatch = useDispatch()
  const [isOver, setIsOver] = useState(false)

  const [updateTask, { isLoading }] = useUpdateTaskMutation()

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!isOver) setIsOver(true)
  }

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (isOver) setIsOver(false)
  }

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    const taskId = e.dataTransfer.getData('taskId')
    const taskStatus = e.dataTransfer.getData('taskStatus')

    if (isOver) setIsOver(false)
    // can't drop on the same column
    if (taskStatus === status) return

    await updateTask({ id: taskId, status })
  }

  return (
    <>
      {isLoading && <Loader open={isLoading} />}
      <Grid container item xs={4} direction="column">
        <TitleWrapper item status={status}>
          <Title variant="h5">{status.replace('-', ' ')}</Title>
          <Count variant="h6">({tasks.length})</Count>
          <AddBtn
            onClick={() => dispatch(setCreatingTaskIn(status))}
            disabled={globalLoading || creatingTaskIn === status}
            aria-label="add task"
          >
            <AddIcon />
          </AddBtn>
        </TitleWrapper>
        <TasksWrapper
          container
          item
          status={status}
          isover={isOver ? 1 : 0}
          direction="column"
          className="droppable"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {creatingTaskIn === status && (
            <Grid item data-testid="add-task-wrapper">
              <Add status={status} globalLoading={globalLoading} />
            </Grid>
          )}
          {tasks.length ? (
            tasks.map(task => (
              <Grid item key={task.id} data-testid="task-wrapper">
                <Task task={task} globalLoading={globalLoading} />
              </Grid>
            ))
          ) : (
            <Grid item>
              <NoTasks variant="h6">No tasks</NoTasks>
            </Grid>
          )}
        </TasksWrapper>
      </Grid>
    </>
  )
}

export default Column
