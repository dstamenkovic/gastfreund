import Grid from '@mui/material/Grid'

import Column from '../Column'
import { Task } from 'Types'

type Props = {
  tasks: Task[]
}

const columns: Task['status'][] = ['to-do', 'in-progress', 'done']

const Board = ({ tasks }: Props) => {
  // group tasks by status
  const groupedTasks = tasks.reduce((acc, task) => {
    const { status } = task
    if (!acc[status]) {
      acc[status] = []
    }
    acc[status].push(task)
    return acc
  }, {} as Record<Task['status'], Task[]>)

  return (
    <Grid container direction="row" spacing={2}>
      {columns.map(status => (
        <Column key={status} status={status} tasks={groupedTasks[status] || []} />
      ))}
    </Grid>
  )
}

export default Board
