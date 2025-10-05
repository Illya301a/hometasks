import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: 'light',
  language: 'uk',
  notifications: true
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateTheme: (state, action) => {
      state.theme = action.payload
    },
    updateLanguage: (state, action) => {
      state.language = action.payload
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications
    }
  }
})

export const { updateTheme, updateLanguage, toggleNotifications } = settingsSlice.actions
export default settingsSlice.reducer
