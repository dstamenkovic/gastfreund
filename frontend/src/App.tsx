import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useSelector } from 'react-redux'

import type { RootState } from 'store'
import Dashboard from 'containers/DashboardContainer'
import Navbar from 'components/Navbar'

const darkTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  })

export default function MyApp() {
  const darkMode = useSelector((state: RootState) => state.dash.darkMode)
  return (
    <ThemeProvider theme={darkTheme(darkMode)}>
      <CssBaseline />
      <Navbar />
      <Dashboard />
    </ThemeProvider>
  )
}
