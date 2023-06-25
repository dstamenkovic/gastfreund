import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'

import Task from '../Task'
import { Task as TaskType } from 'Types'
import { TitleWrapper, Title, TasksWrapper } from './Column.styles'
import Typography from '@mui/material/Typography'

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
  return (
    <Grid container item xs={4} direction="column">
      <TitleWrapper item status={status}>
        <Title variant="h5">{status.replace('-', ' ')}</Title>
      </TitleWrapper>
      <TasksWrapper container item status={status} direction="column">
        {tasks.length ? (
          tasks.map(task => (
            <Grid item key={task.id}>
              <Task title={task.title} status={status} />
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
