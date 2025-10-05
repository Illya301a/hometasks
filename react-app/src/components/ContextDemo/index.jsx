import { useAppContext } from '../../context/AppContext'

function DeepNestedComponent() {
  const { settings, currentUser } = useAppContext()
  
  return (
    <div className="deep-nested">
      <h4>🔍 Глибоко вкладений компонент (рівень 3)</h4>
      <p>Цей компонент знаходиться на 3-му рівні вкладеності і має прямий доступ до контексту!</p>
      <div className="context-info">
        <p><strong>Поточний користувач:</strong> {currentUser.name} {currentUser.avatar}</p>
        <p><strong>Активна тема:</strong> {settings.theme}</p>
        <p><strong>Мова інтерфейсу:</strong> {settings.language}</p>
      </div>
    </div>
  )
}

function NestedComponent() {
  const { users } = useAppContext()
  
  return (
    <div className="nested">
      <h4>📦 Вкладений компонент (рівень 2)</h4>
      <p>Цей компонент знаходиться на 2-му рівні вкладеності</p>
      <p>Кількість користувачів у системі: <strong>{users.length}</strong></p>
      
      <DeepNestedComponent />
    </div>
  )
}

function ContextDemo() {
  const { settings, updateTheme } = useAppContext()
  
  return (
    <div className="context-demo">
      <h3>🎯 Демонстрація React Context</h3>
      <p>Цей компонент демонструє, як дані передаються через Context на різних рівнях вкладеності</p>
      
      <div className="demo-controls">
        <button 
          onClick={() => updateTheme(settings.theme === 'light' ? 'dark' : 'light')}
          className="demo-button"
        >
          Перемкнути тему: {settings.theme === 'light' ? '🌙 Темна' : '☀️ Світла'}
        </button>
      </div>
      
      <NestedComponent />
    </div>
  )
}

export default ContextDemo
