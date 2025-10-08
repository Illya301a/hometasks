import { useSelector, useDispatch } from 'react-redux'
import { 
  updateTheme, 
  updateLanguage, 
  toggleNotifications,
  selectSettingsLoading,
  selectSettingsError,
  selectSettingsLastSync,
  saveSettings,
  syncSettings,
  clearSettingsError
} from '../../store'

function ThemeSettings() {
  const settings = useSelector(state => state.settings)
  const settingsLoading = useSelector(selectSettingsLoading)
  const settingsError = useSelector(selectSettingsError)
  const settingsLastSync = useSelector(selectSettingsLastSync)
  const dispatch = useDispatch()

  const handleSaveSettings = () => {
    dispatch(saveSettings(settings))
  }

  const handleSyncSettings = () => {
    dispatch(syncSettings())
  }

  return (
    <div className="theme-settings">
      <h3>⚙️ Налаштування</h3>
      
      <div className="setting-group">
        <label htmlFor="theme-select">🎨 Тема:</label>
        <select 
          id="theme-select"
          value={settings.theme} 
          onChange={(e) => dispatch(updateTheme(e.target.value))}
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
          onChange={(e) => dispatch(updateLanguage(e.target.value))}
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
            onChange={() => dispatch(toggleNotifications())}
            className="setting-checkbox"
          />
          🔔 Сповіщення
        </label>
      </div>

      {settingsLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <span>Збереження налаштувань...</span>
        </div>
      )}
      
      {settingsError && (
        <div className="error-message">
          <span>❌ Помилка: {settingsError}</span>
          <button 
            onClick={() => dispatch(clearSettingsError())}
            className="error-close"
          >
            ✕
          </button>
        </div>
      )}

      <div className="settings-actions">
        <button 
          onClick={handleSaveSettings}
          disabled={settingsLoading}
          className="save-button"
        >
          {settingsLoading ? '⏳ Збереження...' : '💾 Зберегти налаштування'}
        </button>
        
        <button 
          onClick={handleSyncSettings}
          disabled={settingsLoading}
          className="sync-button"
        >
          🔄 Синхронізувати з сервером
        </button>
      </div>

      <div className="current-settings">
        <h4>Поточні налаштування:</h4>
        <ul>
          <li>Тема: {settings.theme === 'light' ? '☀️ Світла' : settings.theme === 'dark' ? '🌙 Темна' : '🔄 Автоматична'}</li>
          <li>Мова: {settings.language === 'uk' ? '🇺🇦 Українська' : settings.language === 'en' ? '🇺🇸 English' : '🇷🇺 Русский'}</li>
          <li>Сповіщення: {settings.notifications ? '🔔 Увімкнено' : '🔕 Вимкнено'}</li>
          {settingsLastSync && (
            <li>Остання синхронізація: {new Date(settingsLastSync).toLocaleString()}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default ThemeSettings
