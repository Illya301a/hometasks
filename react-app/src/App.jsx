import './App.css'
import ControlledForm from './ControlledForm'
import UncontrolledForm from './UncontrolledForm'
import ServerData from './ServerData'

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <ControlledForm />
      <UncontrolledForm />
      <ServerData />
    </div>
  )
}

export default App
