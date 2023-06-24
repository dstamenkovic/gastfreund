import Grid from '@mui/material/Grid'

import Task from '../Task'

import { TitleWrapper, Title, TasksWrapper } from './Column.styles'

type Props = {
  status: 'to-do' | 'in-progress' | 'done'
}

const Column = ({ status }: Props) => {
  return (
    <Grid container item xs={4} direction="column">
      <TitleWrapper item status={status}>
        <Title>{status.replace('-', ' ')}</Title>
      </TitleWrapper>
      <TasksWrapper container item status={status} direction="column">
        <Grid item>
          <Task title="Task 111" status={status} />
        </Grid>
        <Grid item>
          <Task title="Task 2222" status={status} />
        </Grid>
      </TasksWrapper>
    </Grid>
  )
}

export default Column
