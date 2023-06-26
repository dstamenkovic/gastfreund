import Grid from '@mui/material/Grid'

import Column from '../Column'
import type { Task } from 'Types'

type Props = {
  tasks: Task[]
  globalLoading: boolean
}

const columns: Task['status'][] = ['to-do', 'in-progress', 'done']

const Board = ({ tasks, globalLoading }: Props) => {
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
        <Column
          key={status}
          status={status}
          tasks={groupedTasks[status] || []}
          globalLoading={globalLoading}
        />
      ))}
    </Grid>
  )
}

export default Board
