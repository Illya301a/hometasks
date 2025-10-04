import { useRef } from 'react'

function UncontrolledForm() {
  const nameRef = useRef()
  const emailRef = useRef()
  const checkboxRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      isChecked: checkboxRef.current.checked
    }
    console.log('Uncontrolled Form Data:', formData)
    
    nameRef.current.value = ''
    emailRef.current.value = ''
    checkboxRef.current.checked = false
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Uncontrolled Form</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Name:
            <input
              ref={nameRef}
              type="text"
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>
            Email:
            <input
              ref={emailRef}
              type="email"
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              ref={checkboxRef}
              type="checkbox"
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
        <p>Values are controlled by DOM, not React state</p>
        <p>Form clears after submit</p>
      </div>
    </div>
  )
}

export default UncontrolledForm