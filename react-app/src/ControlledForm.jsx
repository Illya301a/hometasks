import { useState } from 'react'

function ControlledForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Controlled Form Data:', { name, email, isChecked })
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Controlled Form</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              style={{ marginRight: '10px' }}
            />
            Subscribe to newsletter
          </label>
        </div>
        
        <button type="submit" style={{ padding: '8px 16px' }}>
          Submit
        </button>
      </form>
      
      <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
        <p>Current values:</p>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Checked: {isChecked ? 'Yes' : 'No'}</p>
      </div>
    </div>
  )
}

export default ControlledForm
