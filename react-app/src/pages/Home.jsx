import UserProfile from '../components/UserProfile'
import ContextDemo from '../components/ContextDemo'

function Home() {
    return (
        <div className="page">
            <h1>🏠 Головна сторінка</h1>
            <p>Ласкаво просимо на мій неймовірний сайт!</p>
            <div className="content">
                <p>Це головна сторінка мого супер проекту з супер красивим дизайном</p>
                <p>Використовуйте навігацію вище для переходу між розділами.</p>
                <button className="button">Почати роботу</button>
                
                <div className="context-section">
                    <UserProfile />
                    <ContextDemo />
                </div>
            </div>
        </div>
    )
}

export default Home