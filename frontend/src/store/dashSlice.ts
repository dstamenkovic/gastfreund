import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface DashState {
  activeTask: string | null
}

const initialState: DashState = {
  activeTask: null,
}

const dashSlice = createSlice({
  name: 'dash',
  initialState,
  reducers: {
    setActiveTask(state, action: PayloadAction<string | null>) {
      state.activeTask = action.payload
    },
  },
})

export const { setActiveTask } = dashSlice.actions

export default dashSlice.reducer
