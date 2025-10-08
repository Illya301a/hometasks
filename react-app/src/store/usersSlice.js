import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userApi } from '../api/mockApi'

const initialState = {
  users: [],
  currentUser: {
    id: 1,
    name: 'Ілля',
    email: 'wandershlepa@gmail.com',
    role: 'Розробник',
    avatar: '👨‍💻'
  },
  loading: false,
  error: null
}

// Асинхронные thunks
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const users = await userApi.getUsers()
      return users
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const newUser = await userApi.createUser(userData)
      return newUser
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateUserAsync = createAsyncThunk(
  'users/updateUserAsync',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const updatedUser = await userApi.updateUser(id, updates)
      return updatedUser
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteUserAsync = createAsyncThunk(
  'users/deleteUserAsync',
  async (id, { rejectWithValue }) => {
    try {
      await userApi.deleteUser(id)
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

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
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Create User
      .addCase(createUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false
        state.users.push(action.payload)
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Update User
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.loading = false
        const index = state.users.findIndex(user => user.id === action.payload.id)
        if (index !== -1) {
          state.users[index] = action.payload
        }
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Delete User
      .addCase(deleteUserAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.loading = false
        state.users = state.users.filter(user => user.id !== action.payload)
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { addUser, updateCurrentUser, removeUser, updateUser, clearError } = usersSlice.actions
export default usersSlice.reducer
