import { useAppContext } from '../../context/AppContext'

function ThemeSettings() {
  const { settings, updateTheme, updateLanguage, toggleNotifications } = useAppContext()

  return (
    <div className="theme-settings">
      <h3>⚙️ Налаштування</h3>
      
      <div className="setting-group">
        <label htmlFor="theme-select">🎨 Тема:</label>
        <select 
          id="theme-select"
          value={settings.theme} 
          onChange={(e) => updateTheme(e.target.value)}
          className="setting-select"
        >
          <option value="light">☀️ Світла</option>
          <option value="dark">🌙 Темна</option>
          <option value="auto">🔄 Автоматична</option>
        </select>
      </div>

      <div className="setting-group">
        <label htmlFor="language-select">🌍 Мова:</label>
        <select 
          id="language-select"
          value={settings.language} 
          onChange={(e) => updateLanguage(e.target.value)}
          className="setting-select"
        >
          <option value="uk">🇺🇦 Українська</option>
          <option value="en">🇺🇸 English</option>
          <option value="ru">🇷🇺 Русский</option>
        </select>
      </div>

      <div className="setting-group">
        <label className="checkbox-label">
          <input 
            type="checkbox" 
            checked={settings.notifications}
            onChange={toggleNotifications}
            className="setting-checkbox"
          />
          🔔 Сповіщення
        </label>
      </div>

      <div className="current-settings">
        <h4>Поточні налаштування:</h4>
        <ul>
          <li>Тема: {settings.theme === 'light' ? '☀️ Світла' : settings.theme === 'dark' ? '🌙 Темна' : '🔄 Автоматична'}</li>
          <li>Мова: {settings.language === 'uk' ? '🇺🇦 Українська' : settings.language === 'en' ? '🇺🇸 English' : '🇷🇺 Русский'}</li>
          <li>Сповіщення: {settings.notifications ? '🔔 Увімкнено' : '🔕 Вимкнено'}</li>
        </ul>
      </div>
    </div>
  )
}

export default ThemeSettings
