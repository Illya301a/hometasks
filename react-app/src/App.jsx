import './App.css'
import Menu from './components/Menu'
import AppRoutes from './pages/AppRoutes'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="app">
        <Menu />
        <main>
          <AppRoutes />
        </main>
      </div>
    </Router>
  )
}

export default App
