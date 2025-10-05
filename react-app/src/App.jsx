import './App.css'
import Menu from './components/Menu'
import AppRoutes from './pages/AppRoutes'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import { store } from './store'

function AppContent() {
  const settings = useSelector(state => state.app.settings)
  
  return (
    <Router>
      <div className="app" data-theme={settings.theme}>
        <Menu />
        <main>
          <AppRoutes />
        </main>
      </div>
    </Router>
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
