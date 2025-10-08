import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  count: 0,
  isLoading: false,
  error: null,
  lastAction: null
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1
      state.lastAction = 'increment'
    },
    decrement: (state) => {
      state.count -= 1
      state.lastAction = 'decrement'
    },
    resetCount: (state) => {
      state.count = 0
      state.lastAction = 'reset'
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

export const { 
  increment, 
  decrement, 
  resetCount, 
  setLoading, 
  setError, 
  clearError 
} = appSlice.actions

export default appSlice.reducer

// Селекторы
export const selectCount = (state) => state.app.count
export const selectIsLoading = (state) => state.app.isLoading
export const selectError = (state) => state.app.error
export const selectLastAction = (state) => state.app.lastAction
