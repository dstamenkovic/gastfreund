import { createGlobalStyle } from 'styled-components'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import Dashboard from 'containers/DashboardContainer'
import Navbar from 'components/Navbar'

const GlobalStyle = createGlobalStyle`
  html,body {
    margin: 0;
  }
`

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

export default function MyApp() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <CssBaseline />
      <Navbar />
      <Dashboard />
    </ThemeProvider>
  )
}
