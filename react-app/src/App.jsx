import './App.css'
import Menu from './components/Menu'
import AppRoutes from './pages/AppRoutes'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAppContext } from './context/AppContext'

function App() {
  const { settings } = useAppContext()
  
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

export default App
