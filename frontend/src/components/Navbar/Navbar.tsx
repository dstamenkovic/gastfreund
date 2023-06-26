import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import { useLazyGetTasksQuery } from 'services/tasks'
import type { RootState } from 'store'
import { setDarkMode } from 'store/dashSlice'
import { Search, SearchIconWrapper, StyledInputBase } from './Navbar.styles'

const Navbar = () => {
  const darkMode = useSelector((state: RootState) => state.dash.darkMode)
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')
  const [searched, setSearched] = useState(false)
  const [getTasks, { isFetching }] = useLazyGetTasksQuery(undefined)

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key !== 'Enter' || isFetching) return
    getTasks(inputValue)
    setSearched(true)
  }

  const clearSearch = () => {
    setInputValue('')
    getTasks(undefined)
    setSearched(false)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="dark mode"
            sx={{ mr: 2 }}
            onClick={() => dispatch(setDarkMode(!darkMode))}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Gastfreund
          </Typography>
          {searched && !isFetching && (
            <Button color="inherit" onClick={clearSearch} aria-label="clear">
              Clear
            </Button>
          )}
          {isFetching && <CircularProgress size={25} color="inherit" />}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              disabled={isFetching}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown={onSearch}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
