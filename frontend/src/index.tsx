import React from 'react'
import ReactDOM from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Provider } from 'react-redux'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import App from './App'
import reportWebVitals from './reportWebVitals'

import { store } from './store'

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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
