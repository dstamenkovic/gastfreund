import { styled } from '@mui/system'
import Grid from '@mui/material/Grid'

type Props = {
  status: 'to-do' | 'in-progress' | 'done'
}

type StyleProps = {
  status: 'to-do' | 'in-progress' | 'done'
}

const TitleWrapper = styled(Grid)<StyleProps>`
  background-color: ${({ status }) => returnTitleColor(status)};
  margin-bottom: 0.5rem;
`

const Title = styled('h2')`
  text-transform: capitalize;
  text-align: center;
  color: #fef8fc;
`

function returnColumnColor(status: 'to-do' | 'in-progress' | 'done') {
  switch (status) {
    case 'to-do':
      return '#BDE3F6'
    case 'in-progress':
      return '#F5C2C3'
    case 'done':
      return '#BAC3CB'
  }
}

function returnTitleColor(status: 'to-do' | 'in-progress' | 'done') {
  switch (status) {
    case 'to-do':
      return '#1992DB'
    case 'in-progress':
      return '#E22958'
    case 'done':
      return '#102540'
  }
}

const TasksWrapper = styled(Grid)<StyleProps>`
  background-color: ${({ status }) => returnColumnColor(status)};
`

const Column = ({ status }: Props) => {
  return (
    <Grid container item xs={4} direction="column">
      <TitleWrapper item status={status}>
        <Title>{status.replace('-', ' ')}</Title>
      </TitleWrapper>
      <TasksWrapper container item status={status} direction="column">
        <Grid item>Task 1</Grid>
        <Grid item>Task 2</Grid>
      </TasksWrapper>
    </Grid>
  )
}

export default Column
