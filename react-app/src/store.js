import { configureStore, createSlice } from '@reduxjs/toolkit'

// Minimal app slice capturing global data used in the app
const appSlice = createSlice({
  name: 'app',
  initialState: {
    users: [
      { id: 1, name: 'Ілля', email: 'wandershlepa@gmail.com', role: 'Розробник', avatar: '👨‍💻' },
      { id: 2, name: 'Анна', email: 'anna@example.com', role: 'Дизайнер', avatar: '👩‍🎨' },
      { id: 3, name: 'Олексій', email: 'oleksiy@example.com', role: 'Менеджер', avatar: '👨‍💼' }
    ],
    settings: { theme: 'light', language: 'uk', notifications: true },
    currentUser: { id: 1, name: 'Ілля', email: 'wandershlepa@gmail.com', role: 'Розробник', avatar: '👨‍💻' }
  },
  reducers: {
    updateTheme: (state, action) => { state.settings.theme = action.payload },
    updateLanguage: (state, action) => { state.settings.language = action.payload },
    toggleNotifications: (state) => { state.settings.notifications = !state.settings.notifications },
    addUser: (state, action) => { state.users.push({ ...action.payload, id: Date.now() }) },
    updateCurrentUser: (state, action) => { state.currentUser = { ...state.currentUser, ...action.payload } }
  }
})

export const { updateTheme, updateLanguage, toggleNotifications, addUser, updateCurrentUser } = appSlice.actions

export const store = configureStore({
  reducer: { app: appSlice.reducer }
})
