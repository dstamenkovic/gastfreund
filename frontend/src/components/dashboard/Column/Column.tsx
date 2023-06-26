import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { useSelector, useDispatch } from 'react-redux'

import Task from '../Task'
import Add from '../Task/Add'
import type { RootState } from 'store'
import { setCreatingTaskIn } from 'store/dashSlice'
import type { Task as TaskType } from 'Types'
import { TitleWrapper, Title, TasksWrapper, AddBtn, Count } from './Column.styles'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'

const NoTasks = styled(Typography)`
  color: #fff;
  text-align: center;
  text-transform: capitalize;
  padding: 1rem;
`

type Props = {
  status: 'to-do' | 'in-progress' | 'done'
  tasks: TaskType[]
}

const Column = ({ status, tasks }: Props) => {
  const creatingTaskIn = useSelector((state: RootState) => state.dash.creatingTaskIn)
  const dispatch = useDispatch()
  return (
    <Grid container item xs={4} direction="column">
      <TitleWrapper item status={status}>
        <Title variant="h5">{status.replace('-', ' ')}</Title>
        <Count variant="h6">({tasks.length})</Count>
        <AddBtn onClick={() => dispatch(setCreatingTaskIn(status))}>
          <AddIcon />
        </AddBtn>
      </TitleWrapper>
      <TasksWrapper container item status={status} direction="column">
        {creatingTaskIn === status && (
          <Grid item>
            <Add status={status} />
          </Grid>
        )}
        {tasks.length ? (
          tasks.map(task => (
            <Grid item key={task.id}>
              <Task task={task} />
            </Grid>
          ))
        ) : (
          <Grid item>
            <NoTasks variant="h6">No tasks</NoTasks>
          </Grid>
        )}
      </TasksWrapper>
    </Grid>
  )
}

export default Column
