import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { settingsApi } from '../api/mockApi'

const initialState = {
  theme: 'light',
  language: 'uk',
  notifications: true,
  loading: false,
  error: null,
  lastSync: null
}

// Асинхронные thunks
export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async (_, { rejectWithValue }) => {
    try {
      const settings = await settingsApi.getSettings()
      return settings
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const saveSettings = createAsyncThunk(
  'settings/saveSettings',
  async (settings, { rejectWithValue }) => {
    try {
      const savedSettings = await settingsApi.saveSettings(settings)
      return savedSettings
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const syncSettings = createAsyncThunk(
  'settings/syncSettings',
  async (_, { rejectWithValue }) => {
    try {
      const syncedSettings = await settingsApi.syncSettings()
      return syncedSettings
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

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
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Settings
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false
        state.theme = action.payload.theme
        state.language = action.payload.language
        state.notifications = action.payload.notifications
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Save Settings
      .addCase(saveSettings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(saveSettings.fulfilled, (state, action) => {
        state.loading = false
        state.theme = action.payload.theme
        state.language = action.payload.language
        state.notifications = action.payload.notifications
        state.lastSync = new Date().toISOString()
      })
      .addCase(saveSettings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Sync Settings
      .addCase(syncSettings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(syncSettings.fulfilled, (state, action) => {
        state.loading = false
        state.theme = action.payload.theme
        state.language = action.payload.language
        state.notifications = action.payload.notifications
        state.lastSync = new Date().toISOString()
      })
      .addCase(syncSettings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { updateTheme, updateLanguage, toggleNotifications, clearError } = settingsSlice.actions
export default settingsSlice.reducer
