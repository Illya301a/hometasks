import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { 
  increment, 
  decrement, 
  resetCount, 
  selectCount, 
  selectSettings,
  selectAllUsers,
  updateTheme 
} from './store'
import ThemeSettings from './components/ThemeSettings'
import UserProfile from './components/UserProfile'
import './App.css'

function Home() {
  const count = useSelector(selectCount)
  const settings = useSelector(selectSettings)
  const users = useSelector(selectAllUsers)
  const dispatch = useDispatch()

  return (
    <div className="app" data-theme={settings.theme}>
      <h1>🚀 Redux Toolkit Optimized!</h1>
      
      <div className="counter-section">
        <h2>Counter: {count}</h2>
        <div className="button-group">
          <button onClick={() => dispatch(increment())}>
            ➕ Increment
          </button>
          <button onClick={() => dispatch(decrement())}>
            ➖ Decrement
          </button>
          <button onClick={() => dispatch(resetCount())}>
            🔄 Reset
          </button>
        </div>
      </div>

      <div className="theme-section">
        <h3>Current Theme: {settings.theme === 'light' ? '☀️ Light' : '🌙 Dark'}</h3>
        <button onClick={() => dispatch(updateTheme(settings.theme === 'light' ? 'dark' : 'light'))}>
          🎨 Toggle Theme
        </button>
      </div>
      
      <div className="users-section">
        <h3>👥 Users ({users.length}):</h3>
        {users.map(user => (
          <div key={user.id} className="user-card">
            <span className="avatar">{user.avatar}</span>
            <div>
              <strong>{user.name}</strong> - {user.role}
              <br />
              <small>{user.email}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navigation">
          <Link to="/">🏠 Home</Link>
          <Link to="/settings">⚙️ Settings</Link>
          <Link to="/profile">👤 Profile</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<ThemeSettings />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App