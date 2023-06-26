import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { Task as TaskType } from 'Types'

export interface DashState {
  activeTaskID: string | null
  activeTaskText: string
  creatingTaskIn: TaskType['status'] | ''
  creatingTaskText: string
  darkMode: boolean
  errorMsg: string
}

const initialState: DashState = {
  activeTaskID: null,
  activeTaskText: '',
  creatingTaskIn: '',
  creatingTaskText: '',
  darkMode: false,
  errorMsg: '',
}

const dashSlice = createSlice({
  name: 'dash',
  initialState,
  reducers: {
    setActiveTaskID(state, action: PayloadAction<string | null>) {
      state.activeTaskText = ''
      state.activeTaskID = action.payload
    },
    setActiveTaskText(state, action: PayloadAction<string>) {
      state.activeTaskText = action.payload
    },
    removeActiveTaskData(state) {
      state.activeTaskID = null
      state.activeTaskText = ''
    },
    setCreatingTaskIn(state, action: PayloadAction<TaskType['status'] | ''>) {
      state.creatingTaskIn = action.payload
      state.creatingTaskText = ''
    },
    setCreatingTaskText(state, action: PayloadAction<string>) {
      state.creatingTaskText = action.payload
    },
    removeCreatingTask(state) {
      state.creatingTaskIn = ''
      state.creatingTaskText = ''
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload
    },
    setErrorMsg(state, action: PayloadAction<string>) {
      state.errorMsg = action.payload
    },
  },
})

export const {
  setActiveTaskID,
  setActiveTaskText,
  removeActiveTaskData,
  setCreatingTaskIn,
  setCreatingTaskText,
  removeCreatingTask,
  setDarkMode,
  setErrorMsg,
} = dashSlice.actions

export default dashSlice.reducer
