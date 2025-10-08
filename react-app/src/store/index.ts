import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from './settingsSlice'
import usersReducer from './usersSlice'
import appReducer from './appSlice'

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    users: usersReducer,
    app: appReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
})

// Экспортируем типы для TypeScript (если понадобится)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Экспортируем actions для удобства
export { updateTheme, updateLanguage, toggleNotifications } from './settingsSlice'
export { addUser, updateCurrentUser, removeUser, updateUser } from './usersSlice'
export { increment, decrement, resetCount } from './appSlice'

// Селекторы для оптимизации
export const selectSettings = (state) => state.settings
export const selectUsers = (state) => state.users
export const selectApp = (state) => state.app
export const selectCurrentUser = (state) => state.users.currentUser
export const selectAllUsers = (state) => state.users.users
