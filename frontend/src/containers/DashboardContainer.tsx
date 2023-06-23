import Container from '@mui/material/Container'
import { styled } from '@mui/system'

import Board from 'components/dashboard/Board'

const Wrapper = styled(Container)`
  padding-top: 3rem;
`

const DashboardContainer = () => {
  return (
    <Wrapper maxWidth="lg">
      <Board />
    </Wrapper>
  )
}

export default DashboardContainer
