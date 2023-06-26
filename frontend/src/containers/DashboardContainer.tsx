import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'

import { useGetTasksQuery } from 'services/tasks'
import Board from 'components/dashboard/Board'

const Wrapper = styled(Container)`
  padding-top: 3rem;
`

const Loader = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
`

const DashboardContainer = () => {
  const { data, isLoading } = useGetTasksQuery(undefined)
  const globalLoading = isLoading

  return (
    <Wrapper maxWidth="lg">
      {globalLoading && <Loader />}
      {data && <Board tasks={data} globalLoading={globalLoading} />}
    </Wrapper>
  )
}

export default DashboardContainer
