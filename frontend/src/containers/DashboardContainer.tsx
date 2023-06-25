import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'

import { useGetTasksQuery } from 'services/tasks'
import Board from 'components/dashboard/Board'

const Wrapper = styled(Container)`
  padding-top: 3rem;
`

const DashboardContainer = () => {
  const { data, isLoading } = useGetTasksQuery()

  return <Wrapper maxWidth="lg">{data && <Board tasks={data} />}</Wrapper>
}

export default DashboardContainer
