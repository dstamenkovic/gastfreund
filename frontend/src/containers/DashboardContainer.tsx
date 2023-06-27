import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import Alert from '@mui/material/Alert'

import type { RootState } from 'store'
import { setErrorMsg } from 'store/dashSlice'
import { useGetTasksQuery } from 'services/tasks'
import Loader from 'components/Loader'
import Board from 'components/dashboard/Board'

const Wrapper = styled(Container)`
  padding-top: 3rem;
`

const Error = styled(Alert)`
  position: absolute;
  bottom: 7%;
  left: 0;
  right: 0;
  margin: auto;
  width: fit-content;
`

const DashboardContainer = () => {
  const errorMsg = useSelector((state: RootState) => state.dash.errorMsg)
  const dispatch = useDispatch()
  const { data, isLoading } = useGetTasksQuery(undefined)

  // clears the error message
  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        dispatch(setErrorMsg(''))
      }, 4000)
    }
  }, [errorMsg, dispatch])

  return (
    <Wrapper maxWidth="lg">
      {isLoading && <Loader open={isLoading} />}
      {data && <Board tasks={data} />}
      {errorMsg && <Error severity="error">{errorMsg}</Error>}
    </Wrapper>
  )
}

export default DashboardContainer
