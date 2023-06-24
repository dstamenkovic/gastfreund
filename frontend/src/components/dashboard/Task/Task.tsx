import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { returnTaskColor } from 'utils/statusColor'

type Props = {
  title: string
  status: 'to-do' | 'in-progress' | 'done'
}

const DeleteBtn = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  display: none;
  color: #fff;
`

const TaskElement = styled(Paper)<Pick<Props, 'status'>>`
  position: relative;
  margin: 0.5rem 3rem;
  padding: 1rem;
  background-color: ${({ status }) => returnTaskColor(status)};
  color: #dbfefe;
  &:hover {
    color: #fff;
    box-shadow: ${({ theme }) => theme.shadows[5]};

    .delete-task-btn {
      display: block;
      background-color: transparent;
    }
  }
`

const TaskTitle = styled('h2')``

const Task = ({ title, status }: Props) => {
  return (
    <div>
      <TaskElement status={status} elevation={3}>
        <DeleteBtn className="delete-task-btn">
          <CloseIcon />
        </DeleteBtn>
        <TaskTitle>{title}</TaskTitle>
      </TaskElement>
    </div>
  )
}

export default Task
