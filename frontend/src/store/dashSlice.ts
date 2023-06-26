import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { Task as TaskType } from 'Types'

export interface DashState {
  activeTaskID: string | null
  activeTaskText: string
  creatingTaskIn: TaskType['status'] | ''
  creatingTaskText: string
}

const initialState: DashState = {
  activeTaskID: null,
  activeTaskText: '',
  creatingTaskIn: '',
  creatingTaskText: '',
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
    },
    setCreatingTaskText(state, action: PayloadAction<string>) {
      state.creatingTaskText = action.payload
    },
    removeCreatingTask(state) {
      state.creatingTaskIn = ''
      state.creatingTaskText = ''
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
} = dashSlice.actions

export default dashSlice.reducer