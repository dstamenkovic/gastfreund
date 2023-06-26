import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'
import Alert from '@mui/material/Alert'

import type { RootState } from 'store'
import { setErrorMsg } from 'store/dashSlice'
import { useGetTasksQuery } from 'services/tasks'
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

const Loader = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
`

const DashboardContainer = () => {
  const errorMsg = useSelector((state: RootState) => state.dash.errorMsg)
  const dispatch = useDispatch()
  const { data, isLoading } = useGetTasksQuery(undefined)
  const globalLoading = isLoading

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
      {globalLoading && <Loader />}
      {data && <Board tasks={data} globalLoading={globalLoading} />}
      {errorMsg && <Error severity="error">{errorMsg}</Error>}
    </Wrapper>
  )
}

export default DashboardContainer
