import Grid from '@mui/material/Grid'

import Column from './Column'

const Board = () => {
  return (
    <Grid container direction="row" spacing={2}>
      <Column status="to-do" />
      <Column status="in-progress" />
      <Column status="done" />
    </Grid>
  )
}

export default Board
