import React from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import './App.css'

// Создаем простой слайс
const appSlice = createSlice({
  name: 'app',
  initialState: {
    count: 0,
    theme: 'light',
    users: [
      { id: 1, name: 'Ілля', role: 'Розробник' },
      { id: 2, name: 'Анна', role: 'Дизайнер' }
    ]
  },
  reducers: {
    increment: (state) => { state.count += 1 },
    changeTheme: (state) => { state.theme = state.theme === 'light' ? 'dark' : 'light' }
  }
})

export const { increment, changeTheme } = appSlice.actions

// Создаем store
const store = configureStore({
  reducer: {
    app: appSlice.reducer
  }
})

function AppContent() {
  const count = useSelector(state => state.app.count)
  const theme = useSelector(state => state.app.theme)
  const users = useSelector(state => state.app.users)
  const dispatch = useDispatch()

  return (
    <div className="app" data-theme={theme}>
      <h1>🚀 Redux Toolkit Working!</h1>
      <p>Count: {count}</p>
      <p>Theme: {theme}</p>
      
      <button onClick={() => dispatch(increment())}>
        Increment: {count}
      </button>
      
      <button onClick={() => dispatch(changeTheme())}>
        Toggle Theme: {theme}
      </button>
      
      <div>
        <h3>Users:</h3>
        {users.map(user => (
          <div key={user.id}>{user.name} - {user.role}</div>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App