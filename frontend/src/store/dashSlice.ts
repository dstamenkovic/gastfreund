import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface DashState {
  activeTaskID: string | null
  activeTaskText: string
}

const initialState: DashState = {
  activeTaskID: null,
  activeTaskText: '',
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
  },
})

export const { setActiveTaskID, setActiveTaskText, removeActiveTaskData } = dashSlice.actions

export default dashSlice.reducer
