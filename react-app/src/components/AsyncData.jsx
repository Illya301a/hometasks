import { useState, useEffect } from 'react'
import axios from 'axios'

function AsyncData() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setPosts(response.data)
      } catch (err) {
        setError('Помилка завантаження даних')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="async-container loading">
        <h3 className="async-title">Завантаження даних...</h3>
        <p className="async-text">Отримуємо пости з сервера...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="async-container error">
        <h3 className="async-title">Помилка</h3>
        <p className="async-text error-text">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="error-button"
        >
          Спробувати знову
        </button>
      </div>
    )
  }

  return (
    <div className="async-container success">
      <h3 className="async-title">Дані успішно завантажено!</h3>
      <p className="async-text">Знайдено {posts.length} постів:</p>
      
      <div className="posts-container">
        {posts.slice(0, 5).map(post => (
          <div key={post.id} className="post-item">
            <h4 className="post-title">
              {post.title}
            </h4>
            <p className="post-body">
              {post.body}
            </p>
          </div>
        ))}
      </div>
      
      <p className="posts-info">
        Показано перші 5 постів з {posts.length} доступних
      </p>
    </div>
  )
}

export default AsyncData
