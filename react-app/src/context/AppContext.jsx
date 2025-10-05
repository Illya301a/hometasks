import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

const initialData = {
  users: [
    {
      id: 1,
      name: 'Ілля',
      email: 'wandershlepa@gmail.com',
      role: 'Розробник',
      avatar: '👨‍💻'
    },
    {
      id: 2,
      name: 'Анна',
      email: 'anna@example.com',
      role: 'Дизайнер',
      avatar: '👩‍🎨'
    },
    {
      id: 3,
      name: 'Олексій',
      email: 'oleksiy@example.com',
      role: 'Менеджер',
      avatar: '👨‍💼'
    }
  ],
  settings: {
    theme: 'light',
    language: 'uk',
    notifications: true
  },
  currentUser: {
    id: 1,
    name: 'Ілля',
    email: 'wandershlepa@gmail.com',
    role: 'Розробник',
    avatar: '👨‍💻'
  }
}

export function AppProvider({ children }) {
  const [appData, setAppData] = useState(initialData)

  const updateTheme = (newTheme) => {
    setAppData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        theme: newTheme
      }
    }))
  }

  const updateLanguage = (newLanguage) => {
    setAppData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        language: newLanguage
      }
    }))
  }

  const toggleNotifications = () => {
    setAppData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        notifications: !prev.settings.notifications
      }
    }))
  }

  const addUser = (newUser) => {
    setAppData(prev => ({
      ...prev,
      users: [...prev.users, { ...newUser, id: Date.now() }]
    }))
  }

  const updateCurrentUser = (userData) => {
    setAppData(prev => ({
      ...prev,
      currentUser: { ...prev.currentUser, ...userData }
    }))
  }

  const value = {
    ...appData,
    updateTheme,
    updateLanguage,
    toggleNotifications,
    addUser,
    updateCurrentUser
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

export default AppContext
