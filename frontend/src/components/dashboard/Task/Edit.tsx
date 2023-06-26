import { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useDispatch } from 'react-redux'

import { setActiveTaskText } from 'store/dashSlice'
import { SaveBtn, InputField, CancelBtn } from './Task.styles'

type Props = {
  title: string
  isLoading: boolean
  onSave: (inputVal: string) => void
  onCancel: () => void
}

const TaskEdit = ({ title, isLoading, onSave, onCancel }: Props) => {
  const [inputValue, setInputValue] = useState<string>(title || '')
  const dispatch = useDispatch()

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log('update store', inputValue)
      dispatch(setActiveTaskText(inputValue))
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [inputValue, dispatch])

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
          <CancelBtn onClick={onCancel}>Cancel</CancelBtn>
          <SaveBtn variant="text" onClick={() => onSave(inputValue)} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Save'}
          </SaveBtn>
        </Box>
      </>
    </>
  )
}

export default TaskEdit
