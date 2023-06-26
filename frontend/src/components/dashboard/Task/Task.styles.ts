import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import type { Task as TaskType } from 'Types'
import { returnTaskColor } from 'utils/statusColor'

export const DeleteBtn = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  display: none;
  color: #fff;
`

export const TaskElement = styled(Paper)<Pick<TaskType, 'status'>>`
  position: relative;
  margin: 0.5rem 3rem;
  padding: 1.5rem 1rem 1rem 1rem;
  background-color: ${({ status }) => returnTaskColor(status)};
  color: #dbfefe;
  &:hover {
    color: #fff;
    box-shadow: ${({ theme }) => theme.shadows[7]};

    .delete-task-btn {
      display: block;
      background-color: transparent;
    }
  }
`

export const InputField = styled(TextField)`
  textarea {
    color: #fff;
    font-size: ${({ theme }) => theme.typography.h6};
  }
`

export const SaveBtn = styled(Button)`
  color: #fff;
`

export const CancelBtn = styled(Button)`
  color: #d1d5db;
`
