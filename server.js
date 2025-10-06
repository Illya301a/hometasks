const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');

const app = express();
const PORT = 3000;

const uri = 
  "mongodb+srv://admin:2556507Hjkllzxc@cluster0.nql6ag5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "Marketplace";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connect() {
  try {
    await client.connect()
    console.log("Успешно подключено к MongoDB Atlas")
  
    const db = client.db(dbName)
    console.log("База данных успешно подключена")
    await db.createCollection("emample_collection")
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

app.listen(PORT, () => {
  console.log(`Сервер запущено: http://localhost:${PORT}`);
}); 

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://admin:2556507Hjkllzxc@cluster0.nql6ag5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);