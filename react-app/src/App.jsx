import './App.css'
import AsyncData from './components/AsyncData'

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">
        Асинхронне програмування в React
      </h1>
      <p className="app-subtitle">
        Використання useEffect + axios для HTTP запитів
      </p>
      
      <AsyncData />
    </div>
  )
}

export default App
