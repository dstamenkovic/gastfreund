import { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import { SaveBtn, InputField, CancelBtn } from './Task.styles'

type Props = {
  title: string
  isLoading: boolean
  onSave: (inputVal: string) => void
  onCancel: () => void
  saveTextToStore: (inputVal: string) => void
  creatingTask?: boolean
}

const TaskEdit = ({ title, isLoading, onSave, onCancel, saveTextToStore, creatingTask }: Props) => {
  const [inputValue, setInputValue] = useState<string>(title || '')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (inputValue !== title) saveTextToStore(inputValue)
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [inputValue, saveTextToStore, title])

  return (
    <>
      <>
        <InputField
          label=""
          value={inputValue}
          multiline
          placeholder="Task title"
          rows={2}
          variant="standard"
          fullWidth
          onChange={e => setInputValue(e.target.value)}
          InputProps={{
            disableUnderline: true,
          }}
          disabled={isLoading}
          onKeyDown={e => e.key === 'Enter' && onSave(inputValue)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <CancelBtn onClick={onCancel} disabled={isLoading}>
            Cancel
          </CancelBtn>
          <SaveBtn variant="text" onClick={() => onSave(inputValue)} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : creatingTask ? 'Create' : 'Save'}
          </SaveBtn>
        </Box>
      </>
    </>
  )
}

export default TaskEdit
