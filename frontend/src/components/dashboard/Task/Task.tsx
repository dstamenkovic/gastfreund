import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { returnTaskColor } from 'utils/statusColor'
import { useState } from 'react'

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
  padding: 1.5rem 1rem 1rem 1rem;
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

const InputField = styled(TextField)`
  textarea {
    color: #fff;
    font-size: ${({ theme }) => theme.typography.h6};
  }
`

const SaveBtn = styled(Button)`
  color: #fff;
`

const Task = ({ title, status }: Props) => {
  const [editable, setEditable] = useState<boolean>(false)

  return (
    <div>
      <TaskElement status={status} elevation={3} onDoubleClick={() => setEditable(true)}>
        {!editable && (
          <DeleteBtn className="delete-task-btn">
            <CloseIcon />
          </DeleteBtn>
        )}
        {editable ? (
          <>
            <InputField
              label=""
              multiline
              placeholder="Task title"
              rows={2}
              variant="standard"
              fullWidth
              InputProps={{
                disableUnderline: true,
              }}
            />
            <SaveBtn variant="text" fullWidth onClick={() => setEditable(false)}>
              Save
            </SaveBtn>
          </>
        ) : (
          <Typography variant="h6" component="h6">
            {title}
          </Typography>
        )}
      </TaskElement>
    </div>
  )
}

export default Task
