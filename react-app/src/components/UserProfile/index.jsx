import { useSelector } from 'react-redux'

function UserProfile() {
  const currentUser = useSelector(state => state.app.currentUser)
  const users = useSelector(state => state.app.users)

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
      
      <div className="team-section">
        <h4>👥 Команда ({users.length} осіб)</h4>
        <div className="team-list">
          {users.map(user => (
            <div key={user.id} className="team-member">
              <span className="member-avatar">{user.avatar}</span>
              <span className="member-name">{user.name}</span>
              <span className="member-role">{user.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
