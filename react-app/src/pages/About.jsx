import ThemeSettings from '../components/ThemeSettings'

function About() {
    return (
        <div className="page">
            <h1>ℹ️ Про нас</h1>
            <p>Дізнайтеся більше про мою команду та проект</p>
            <div className="content">
                <p>Я створюю сучасні веб-додатки з використанням передових технологій.</p>
                <ul>
                    <li>🚀 React та сучасний JavaScript</li>
                    <li>🎨 Красивий та адаптивний дизайн</li>
                    <li>⚡ Швидка та відгукова робота</li>
                    <li>🔧 Якісний код та архітектура</li>
                    <li>🎯 React Context для управління глобальним станом</li>
                </ul>
                <button className="button">Зв'язатися з нами</button>
                
                <div className="context-section">
                    <ThemeSettings />
                </div>
            </div>
        </div>
    )
}

export default About