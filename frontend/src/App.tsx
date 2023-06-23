import Button from '@mui/material/Button'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  color: green !important;
`

export default function MyApp() {
  return (
    <div>
      <StyledButton variant="contained">Hello World</StyledButton>
    </div>
  )
}
