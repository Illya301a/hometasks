import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [
    { id: 1, name: 'Ілля', email: 'wandershlepa@gmail.com', role: 'Розробник', avatar: '👨‍💻' },
    { id: 2, name: 'Анна', email: 'anna@example.com', role: 'Дизайнер', avatar: '👩‍🎨' },
    { id: 3, name: 'Олексій', email: 'oleksiy@example.com', role: 'Менеджер', avatar: '👨‍💼' }
  ],
  currentUser: {
    id: 1,
    name: 'Ілля',
    email: 'wandershlepa@gmail.com',
    role: 'Розробник',
    avatar: '👨‍💻'
  }
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push({ ...action.payload, id: Date.now() })
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload }
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload)
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id)
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload }
      }
    }
  }
})

export const { addUser, updateCurrentUser, removeUser, updateUser } = usersSlice.actions
export default usersSlice.reducer
