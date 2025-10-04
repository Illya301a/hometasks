import { useState, useEffect } from 'react'

function ServerData() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
        <h3>Server Data</h3>
        <p>Loading users...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
        <h3>Server Data</h3>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    )
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Server Data</h3>
      <p>Loaded {users.length} users:</p>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {users.map(user => (
          <div key={user.id} style={{ 
            border: '1px solid #eee', 
            margin: '5px 0', 
            padding: '10px',
            borderRadius: '4px'
          }}>
            <strong>{user.name}</strong>
            <br />
            <small>{user.email}</small>
            <br />
            <small>{user.phone}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServerData
