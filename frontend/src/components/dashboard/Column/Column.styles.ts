import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import { returnColumnColor, returnColumnTitleColor } from 'utils/statusColor'

type StyleProps = {
  status: 'to-do' | 'in-progress' | 'done'
}

export const TitleWrapper = styled(Grid)<StyleProps>`
  position: relative;
  background-color: ${({ status }) => returnColumnTitleColor(status)};
  margin-bottom: 0.5rem;
  padding: 1.2rem 1rem;
`

export const Title = styled(Typography)`
  text-transform: capitalize;
  text-align: center;
  color: #fef8fc;
  font-weight: bold;
`

export const TasksWrapper = styled(Grid)<StyleProps>`
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: ${({ status }) => returnColumnColor(status)};
`

export const AddBtn = styled(IconButton)`
  position: absolute;
  color: #fff;
  background-color: transparent;
  top: 50%;
  right: 5%;
  transform: translate(-5%, -50%);

  &:hover {
    background-color: transparent;
  }
`
