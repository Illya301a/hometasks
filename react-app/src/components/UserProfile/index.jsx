import { useSelector, useDispatch } from 'react-redux'
import { 
  selectCurrentUser, 
  selectAllUsers, 
  selectUsersLoading,
  selectUsersError,
  updateCurrentUser, 
  createUser, 
  deleteUserAsync,
  clearUsersError
} from '../../store'

function UserProfile() {
  const currentUser = useSelector(selectCurrentUser)
  const users = useSelector(selectAllUsers)
  const usersLoading = useSelector(selectUsersLoading)
  const usersError = useSelector(selectUsersError)
  const dispatch = useDispatch()

  const handleDeleteUser = async (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити цього користувача?')) {
      dispatch(deleteUserAsync(id))
    }
  }

  const handleAddUser = () => {
    const newUser = {
      name: 'Новий Користувач',
      email: `user${Date.now()}@example.com`,
      role: 'Учасник',
      avatar: '👤'
    }
    dispatch(createUser(newUser))
  }

  return (
    <div className="user-profile">
      <h3>👤 Профіль користувача</h3>
      <div className="user-info">
        <div className="user-avatar">{currentUser.avatar}</div>
        <div className="user-details">
          <h4>{currentUser.name}</h4>
          <p><strong>Роль:</strong> {currentUser.role}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
        </div>
      </div>
      
      <div className="profile-actions">
        <button 
          onClick={() => dispatch(updateCurrentUser({ name: 'Ілля (Оновлено)' }))}
          className="action-button"
        >
          ✏️ Оновити ім'я
        </button>
      </div>

      <div className="team-section">
        <h4>👥 Команда ({users.length} осіб)</h4>
        
        {usersLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <span>Обробка запиту...</span>
          </div>
        )}
        
        {usersError && (
          <div className="error-message">
            <span>❌ Помилка: {usersError}</span>
            <button 
              onClick={() => dispatch(clearUsersError())}
              className="error-close"
            >
              ✕
            </button>
          </div>
        )}
        
        <div className="team-list">
          {users.map(user => (
            <div key={user.id} className="team-member">
              <span className="member-avatar">{user.avatar}</span>
              <span className="member-name">{user.name}</span>
              <span className="member-role">{user.role}</span>
              {user.id !== currentUser.id && (
                <button 
                  onClick={() => handleDeleteUser(user.id)}
                  className="remove-button"
                  title="Видалити користувача"
                  disabled={usersLoading}
                >
                  ❌
                </button>
              )}
            </div>
          ))}
        </div>
        
        <button 
          onClick={handleAddUser}
          className="add-user-button"
          disabled={usersLoading}
        >
          {usersLoading ? '⏳ Додавання...' : '➕ Додати користувача'}
        </button>
      </div>
    </div>
  )
}

export default UserProfile
