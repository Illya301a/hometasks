import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from './settingsSlice'
import usersReducer from './usersSlice'

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    users: usersReducer
  }
})

// Экспортируем actions для удобства
export { updateTheme, updateLanguage, toggleNotifications } from './settingsSlice'
export { addUser, updateCurrentUser, removeUser, updateUser } from './usersSlice'
