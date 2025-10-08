const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const mongoose = require('mongoose')

const app = express();
const PORT = 3000;

const uri = 
  "mongodb+srv://admin:2556507Hjkllzxc@cluster0.nql6ag5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "Marketplace";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connect(uri)
.then(() => console.log("Mongoose успешно подключен"))
.catch(err => console.error("Ошибка подключения Mongoose", err))

async function connect() {
  try {
    await client.connect()
    console.log("Успешно подключено к MongoDB Atlas")
  
    const db = client.db(dbName)
    const collection = db.collection("Users")

    const userSchema = new mongoose.Schema({
      name: { 
        type: String, 
        required: true 
      },
      email: { 
        type: String, 
        required: true 
      },
      age: { 
        type: Number 
      },
      city: { 
        type: String 
      },
      hobbies: [{ 
        type: String 
      }]
    });
    
  //   const User = mongoose.model('User', userSchema);
    
  //   const newUser = new User({
  //     name: 'John Doe',
  //     age: 30,
  //     email: 'john@example.com'
  //   });

  // newUser.save()
  // .then(doc => console.log('Новий користувач доданий:', doc))
  // .catch(err => console.error('Помилка при додаванні користувача:', err));

    console.log("База данных успешно подключена")
  } catch (err) {
    console.error("Ошибка подключения к MongoDB Atlas", err)
  }
}

connect()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

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

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = authUsers.find(u => u.email === email);
    if (!user) {
      return done(null, false, { message: 'Невірний email або пароль' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return done(null, false, { message: 'Невірний email або пароль' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = authUsers.find(u => u.id === id);
  done(null, user);
});

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
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
  const isAuthenticated = req.isAuthenticated();
  
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
                <a href="/analytics" class="btn btn-info">Аналітика (Курсори)</a>
                ${isAuthenticated ? 
                  '<a href="/profile" class="btn btn-success">Профіль</a><a href="/protected" class="btn btn-warning">Захищена сторінка</a>' : 
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
  const errorMessage = req.flash('error')[0];
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
            ${errorMessage ? `<div class="alert alert-danger">${errorMessage}</div>` : ''}
            <form action="/login" method="POST">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
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

app.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/register', (req, res) => {
  const errorMessage = req.flash('error')[0];
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
            ${errorMessage ? `<div class="alert alert-danger">${errorMessage}</div>` : ''}
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
    req.flash('error', 'Користувач з таким ім\'ям або email вже існує');
    return res.redirect('/register');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = {
    id: authUsers.length + 1,
    username,
    email,
    password: hashedPassword
  };
  
  authUsers.push(newUser);

  req.login(newUser, (err) => {
    if (err) {
      req.flash('error', 'Помилка при вході після реєстрації');
      return res.redirect('/login');
    }
    res.redirect('/profile');
  });
});

app.get('/profile', isAuthenticated, (req, res) => {
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
            <p>Email: ${req.user.email}</p>
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
  req.logout((err) => {
    if (err) {
      return res.redirect('/');
    }
    res.redirect('/');
  });
});

app.get('/protected', isAuthenticated, (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Захищена сторінка</title>
        <link rel="stylesheet" href="/css/style.css">
        <link rel="icon" href="/favicon.ico">
    </head>
    <body class="${req.cookies.theme || 'light'}">
        <div class="container">
            <h1>Захищена сторінка</h1>
            <p>Це захищена сторінка, доступна тільки авторизованим користувачам.</p>
            <p>Ласкаво просимо, ${req.user.username}!</p>
            <p>Ваш email: ${req.user.email}</p>
            <div class="navigation">
                <a href="/" class="btn btn-primary">На головну</a>
                <a href="/profile" class="btn btn-success">Профіль</a>
                <a href="/logout" class="btn btn-danger">Вийти</a>
            </div>
        </div>
    </body>
    </html>
  `);
});

app.get('/users', (req, res) => {
  app.set('view engine', 'pug');
  app.set('views', 'pug');
  res.render('users', { 
    title: 'Користувачі', 
    users: users, 
    theme: req.cookies.theme || 'light',
    isAuthenticated: req.isAuthenticated() 
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
    isAuthenticated: req.isAuthenticated() 
  });
});


app.get('/articles', (req, res) => {
  app.set('view engine', 'ejs');
  app.set('views', 'ejs');
  res.render('articles', { 
    title: 'Статті', 
    articles: articles,
    theme: req.cookies.theme || 'light',
    isAuthenticated: req.isAuthenticated() 
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
    isAuthenticated: req.isAuthenticated() 
  });
});

app.get('/api/users/cursor', async (req, res) => {
  try {
    const db = client.db(dbName);
    const usersCollection = db.collection("Users");
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    
    const cursor = usersCollection.find({}).skip(skip).limit(limit);
    const users = await cursor.toArray();
    const total = await usersCollection.countDocuments();
    
    res.json({ users, page, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/analytics/age-stats', async (req, res) => {
  try {
    const db = client.db(dbName);
    const usersCollection = db.collection("Users");
    
    const pipeline = [
      { $group: { _id: null, avgAge: { $avg: { $toDouble: "$age" } }, count: { $sum: 1 }, minAge: { $min: { $toDouble: "$age" } }, maxAge: { $max: { $toDouble: "$age" } } } }
    ];
    
    const result = await usersCollection.aggregate(pipeline).toArray();
    res.json(result[0] || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/search', async (req, res) => {
  try {
    const db = client.db(dbName);
    const usersCollection = db.collection("Users");
    
    const { name, email } = req.query;
    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (email) filter.email = { $regex: email, $options: 'i' };
    
    const cursor = usersCollection.find(filter).limit(10);
    const users = await cursor.toArray();
    
    res.json({ users, count: users.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/analytics', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Аналітика - Курсори та Агрегація</title>
        <link rel="stylesheet" href="/css/style.css">
        <style>
            .analytics-section { margin: 20px 0; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
            .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 15px 0; }
            .stat-card { background: #000; padding: 15px; border-radius: 5px; text-align: center; }
            .user-card { background: #111827; border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 5px; }
            .search-form { margin: 15px 0; }
            .search-form input { margin: 0 10px; padding: 8px; }
            .pagination { margin: 15px 0; }
            .pagination button { margin: 0 5px; padding: 8px 15px; }
            .loading { color: #666; font-style: italic; }
        </style>
    </head>
    <body class="${req.cookies.theme || 'light'}">
        <div class="container">
            <h1>Аналітика - Курсори та Агрегація MongoDB</h1>
            <p><a href="/" class="btn btn-primary">← На головну</a></p>
            
            <div class="analytics-section">
                <h2>📊 Статистика користувачів (Агрегація)</h2>
                <div id="stats-container">
                    <div class="loading">Завантаження статистики...</div>
                </div>
            </div>
            
            <div class="analytics-section">
                <h2>👥 Користувачі (Курсор - Пагінація)</h2>
                <div id="users-container">
                    <div class="loading">Завантаження користувачів...</div>
                </div>
                <div class="pagination">
                    <button onclick="loadUsers(1)">Перша</button>
                    <button onclick="loadUsers(currentPage - 1)" id="prevBtn">Попередня</button>
                    <span id="pageInfo">Сторінка 1</span>
                    <button onclick="loadUsers(currentPage + 1)" id="nextBtn">Наступна</button>
                    <button onclick="loadUsers(totalPages)" id="lastBtn">Остання</button>
                </div>
            </div>
            
            <div class="analytics-section">
                <h2>🔍 Пошук користувачів (Курсор - Фільтрація)</h2>
                <div class="search-form">
                    <input type="text" id="searchName" placeholder="Ім'я користувача">
                    <input type="text" id="searchEmail" placeholder="Email">
                    <button onclick="searchUsers()" class="btn btn-primary">Пошук</button>
                </div>
                <div id="search-results"></div>
            </div>
        </div>
        
        <script>
            let currentPage = 1;
            let totalPages = 1;
            
            async function loadStats() {
                try {
                    const response = await fetch('/api/analytics/age-stats');
                    const stats = await response.json();
                    
                    document.getElementById('stats-container').innerHTML = \`
                        <div class="stats-grid">
                            <div class="stat-card">
                                <h3>\${stats.count || 0}</h3>
                                <p>Всього користувачів</p>
                            </div>
                            <div class="stat-card">
                                <h3>\${Math.round(stats.avgAge || 0)}</h3>
                                <p>Середній вік</p>
                            </div>
                            <div class="stat-card">
                                <h3>\${stats.minAge || 0}</h3>
                                <p>Мінімальний вік</p>
                            </div>
                            <div class="stat-card">
                                <h3>\${stats.maxAge || 0}</h3>
                                <p>Максимальний вік</p>
                            </div>
                        </div>
                    \`;
                } catch (error) {
                    document.getElementById('stats-container').innerHTML = '<div style="color: red;">Помилка завантаження статистики</div>';
                }
            }
            
            async function loadUsers(page) {
                try {
                    const response = await fetch(\`/api/users/cursor?page=\${page}&limit=5\`);
                    const data = await response.json();
                    
                    currentPage = data.page;
                    totalPages = data.pages;
                    
                    document.getElementById('users-container').innerHTML = data.users.map(user => \`
                        <div class="user-card">
                            <h4>\${user.name}</h4>
                            <p><strong>Email:</strong> \${user.email}</p>
                            <p><strong>Вік:</strong> \${user.age}</p>
                            \${user.city ? \`<p><strong>Місто:</strong> \${user.city}</p>\` : ''}
                            \${user.hobbies ? \`<p><strong>Хобі:</strong> \${user.hobbies.join(', ')}</p>\` : ''}
                        </div>
                    \`).join('');
                    
                    document.getElementById('pageInfo').textContent = \`Сторінка \${currentPage} з \${totalPages}\`;
                    document.getElementById('prevBtn').disabled = currentPage <= 1;
                    document.getElementById('nextBtn').disabled = currentPage >= totalPages;
                    document.getElementById('lastBtn').disabled = currentPage >= totalPages;
                } catch (error) {
                    document.getElementById('users-container').innerHTML = '<div style="color: red;">Помилка завантаження користувачів</div>';
                }
            }
            
            async function searchUsers() {
                const name = document.getElementById('searchName').value;
                const email = document.getElementById('searchEmail').value;
                
                if (!name && !email) {
                    document.getElementById('search-results').innerHTML = '<div style="color: orange;">Введіть хоча б один параметр для пошуку</div>';
                    return;
                }
                
                try {
                    const params = new URLSearchParams();
                    if (name) params.append('name', name);
                    if (email) params.append('email', email);
                    
                    const response = await fetch(\`/api/users/search?\${params}\`);
                    const data = await response.json();
                    
                    if (data.users.length === 0) {
                        document.getElementById('search-results').innerHTML = '<div style="color: orange;">Користувачів не знайдено</div>';
                    } else {
                        document.getElementById('search-results').innerHTML = \`
                            <h3>Знайдено \${data.count} користувачів:</h3>
                            \${data.users.map(user => \`
                                <div class="user-card">
                                    <h4>\${user.name}</h4>
                                    <p><strong>Email:</strong> \${user.email}</p>
                                    <p><strong>Вік:</strong> \${user.age}</p>
                                    \${user.city ? \`<p><strong>Місто:</strong> \${user.city}</p>\` : ''}
                                </div>
                            \`).join('')}
                        \`;
                    }
                } catch (error) {
                    document.getElementById('search-results').innerHTML = '<div style="color: red;">Помилка пошуку</div>';
                }
            }
            
            loadStats();
            loadUsers(1);
        </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Сервер запущено: http://localhost:${PORT}`);
}); 