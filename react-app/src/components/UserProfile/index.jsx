import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, selectAllUsers, updateCurrentUser, addUser, removeUser } from '../../store'

function UserProfile() {
  const currentUser = useSelector(selectCurrentUser)
  const users = useSelector(selectAllUsers)
  const dispatch = useDispatch()

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
        <div className="team-list">
          {users.map(user => (
            <div key={user.id} className="team-member">
              <span className="member-avatar">{user.avatar}</span>
              <span className="member-name">{user.name}</span>
              <span className="member-role">{user.role}</span>
              {user.id !== currentUser.id && (
                <button 
                  onClick={() => dispatch(removeUser(user.id))}
                  className="remove-button"
                  title="Видалити користувача"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => dispatch(addUser({
            name: 'Новий Користувач',
            email: 'new@example.com',
            role: 'Учасник',
            avatar: '👤'
          }))}
          className="add-user-button"
        >
          ➕ Додати користувача
        </button>
      </div>
    </div>
  )
}

export default UserProfile
