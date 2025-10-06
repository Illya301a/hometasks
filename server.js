const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your-secret-key-change-in-production';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/css', express.static('css'));
app.use('/public', express.static('public'));
app.use('/favicon.ico', express.static('public/favicon.ico'));

const users = [
  { id: 1, name: 'Ілля Андрелука', email: 'illia@gmail.com', age: 18, city: 'Одеса' },
  { id: 2, name: 'Кен Канекі', email: 'ken@hotmail.com', age: 52, city: 'Київ' },
  { id: 3, name: 'Петро Порошенко', email: 'petro@icloud.com', age: 59, city: 'Харків' }
];

const authUsers = [
  { id: 1, username: 'admin', email: 'admin@example.com', password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' }
];

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ error: 'Токен доступа не найден' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Недействительный токен' });
    }
    req.user = user;
    next();
  });
};

const articles = [
  { id: 1, title: 'Крутий програматор', content: 'Я не знаю, як писати статті, тому я напишу тут щось нескладне', author: 'Ілля Андрелука', date: '10-08-2025' },
  { id: 2, title: 'Я гуль', 
    content: `Це не світ зіпсований; це ті з нас у ньому. 
    Так, деякі упирі йдуть шляхом, який залишає за собою смуток, але, як і люди, 
    ми можемо вибрати зовсім інший шлях. Нам є чому навчитися, і вашому, і моєму роду.
    Нам потрібно припинити сварку і почати говорити. Тому що, коли йдеться про стан світу, 
    ви не можете вказувати пальцем на упирів чи людей. Ми всі винні.`, 
     author: 'Кен Канекі', date: '04-07-2025' },
  { id: 3, title: 'Петро Порошенко', content: 'Люди гріховні за своєю природою, але якщо немає спокуси – немає гріха.', author: 'Петро Порошенко', date: '01-01-2027' }
];

app.get('/', (req, res) => {
  const theme = req.cookies.theme || 'light';
  const isAuthenticated = !!req.cookies.token;
  
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Головна сторінка</title>
        <link rel="stylesheet" href="/css/style.css">
        <link rel="icon" href="/favicon.ico">
    </head>
    <body class="${theme}">
        <div class="container">
            <h1>Ласкаво просимо!</h1>
            <div class="navigation">
                <a href="/users" class="btn btn-primary">Користувачі (PUG)</a>
                <a href="/articles" class="btn btn-secondary">Статті (EJS)</a>
                ${isAuthenticated ? 
                  '<a href="/profile" class="btn btn-success">Профіль</a>' : 
                  '<a href="/login" class="btn btn-success">Вхід</a>'
                }
            </div>
            <div class="theme-controls">
                <h3>Налаштування теми:</h3>
                <button onclick="setTheme('light')" class="btn btn-light">Світла тема</button>
                <button onclick="setTheme('dark')" class="btn btn-dark">Темна тема</button>
            </div>
        </div>
        
        <script>
            function setTheme(theme) {
                fetch('/api/theme', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ theme: theme })
                }).then(() => {
                    document.body.className = theme;
                });
            }
        </script>
    </body>
    </html>
  `);
});

app.post('/api/theme', (req, res) => {
  const { theme } = req.body;
  res.cookie('theme', theme, { maxAge: 30 * 24 * 60 * 60 * 1000 });
  res.json({ success: true, theme });
});

app.get('/login', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Вхід</title>
        <link rel="stylesheet" href="/css/style.css">
        <link rel="icon" href="/favicon.ico">
    </head>
    <body class="${req.cookies.theme || 'light'}">
        <div class="container">
            <h1>Вхід</h1>
            <form action="/login" method="POST">
                <div class="form-group">
                    <label for="username">Ім'я користувача:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Пароль:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="btn btn-primary">Увійти</button>
            </form>
            <p><a href="/register">Реєстрація</a></p>
            <p><a href="/">На головну</a></p>
        </div>
    </body>
    </html>
  `);
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  const user = authUsers.find(u => u.username === username);
  if (!user) {
    return res.status(401).send('Невірне ім\'я користувача або пароль');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).send('Невірне ім\'я користувача або пароль');
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  });

  res.redirect('/profile');
});

app.get('/register', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Реєстрація</title>
        <link rel="stylesheet" href="/css/style.css">
        <link rel="icon" href="/favicon.ico">
    </head>
    <body class="${req.cookies.theme || 'light'}">
        <div class="container">
            <h1>Реєстрація</h1>
            <form action="/register" method="POST">
                <div class="form-group">
                    <label for="username">Ім'я користувача:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Пароль:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="btn btn-primary">Зареєструватися</button>
            </form>
            <p><a href="/login">Вхід</a></p>
            <p><a href="/">На головну</a></p>
        </div>
    </body>
    </html>
  `);
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  const existingUser = authUsers.find(u => u.username === username || u.email === email);
  if (existingUser) {
    return res.status(400).send('Користувач з таким ім\'ям або email вже існує');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = {
    id: authUsers.length + 1,
    username,
    email,
    password: hashedPassword
  };
  
  authUsers.push(newUser);

  const token = jwt.sign(
    { id: newUser.id, username: newUser.username },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  });

  res.redirect('/profile');
});

app.get('/profile', authenticateToken, (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Профіль</title>
        <link rel="stylesheet" href="/css/style.css">
        <link rel="icon" href="/favicon.ico">
    </head>
    <body class="${req.cookies.theme || 'light'}">
        <div class="container">
            <h1>Профіль користувача</h1>
            <p>Ласкаво просимо, ${req.user.username}!</p>
            <p>ID користувача: ${req.user.id}</p>
            <div class="navigation">
                <a href="/" class="btn btn-primary">На головну</a>
                <a href="/logout" class="btn btn-danger">Вийти</a>
            </div>
        </div>
    </body>
    </html>
  `);
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

app.get('/users', (req, res) => {
  app.set('view engine', 'pug');
  app.set('views', 'pug');
  res.render('users', { 
    title: 'Користувачі', 
    users: users, 
    theme: req.cookies.theme || 'light',
    isAuthenticated: !!req.cookies.token 
  });
});

app.get('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).send('Користувача не знайдено');
  }
  res.render('user-detail', { 
    title: user.name, 
    user: user,
    theme: req.cookies.theme || 'light',
    isAuthenticated: !!req.cookies.token 
  });
});


app.get('/articles', (req, res) => {
  app.set('view engine', 'ejs');
  app.set('views', 'ejs');
  res.render('articles', { 
    title: 'Статті', 
    articles: articles,
    theme: req.cookies.theme || 'light',
    isAuthenticated: !!req.cookies.token 
  });
});

app.get('/articles/:articleId', (req, res) => {
  const articleId = parseInt(req.params.articleId);
  const article = articles.find(a => a.id === articleId);
  
  if (!article) {
    return res.status(404).send('Статтю не знайдено');
  }
  res.render('article-detail', { 
    title: article.title, 
    article: article,
    theme: req.cookies.theme || 'light',
    isAuthenticated: !!req.cookies.token 
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено: http://localhost:${PORT}`);
}); 