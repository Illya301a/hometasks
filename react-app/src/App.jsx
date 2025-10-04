import StatefulCounter from './components/StatefulCounter'
import StatelessUserCard from './components/StatelessUserCard'

function App() {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#000', 
      color: '#fff', 
      minHeight: '100vh',
      width: '100vw',
      margin: 0,
      boxSizing: 'border-box'
    }}>
      <h1 style={{ textAlign: 'center' }}>Stateful vs Stateless компоненти</h1>
      
      <StatefulCounter />
      <StatelessUserCard name="Іван" age={25} />
    </div>
  )
}

export default App
