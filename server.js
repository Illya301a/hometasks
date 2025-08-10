const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use('/css', express.static('css'));

// Фулл данные
const users = [
  { id: 1, name: 'Ілля Андрелука', email: 'illia@gmail.com', age: 18, city: 'Одеса' },
  { id: 2, name: 'Кен Канекі', email: 'ken@hotmail.com', age: 52, city: 'Київ' },
  { id: 3, name: 'Петро Порошенко', email: 'petro@icloud.com', age: 59, city: 'Харків' }
];

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

// Главная страница
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Головна сторінка</title>
        <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
        <div class="container">
            <h1>Ласкаво просимо!</h1>
            <div class="navigation">
                <a href="/users" class="btn btn-primary">Користувачі (PUG)</a>
                <a href="/articles" class="btn btn-secondary">Статті (EJS)</a>
            </div>
        </div>
    </body>
    </html>
  `);
});


// Настройка PUG
app.get('/users', (req, res) => {
  app.set('view engine', 'pug');
  app.set('views', 'pug');
  res.render('users', { title: 'Користувачі', users: users });
});

app.get('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).send('Користувача не знайдено');
  }
  res.render('user-detail', { title: user.name, user: user });
});


// Настройка EJS
app.get('/articles', (req, res) => {
  app.set('view engine', 'ejs');
  app.set('views', 'ejs');
  res.render('articles', { title: 'Статті', articles: articles });
});

app.get('/articles/:articleId', (req, res) => {
  const articleId = parseInt(req.params.articleId);
  const article = articles.find(a => a.id === articleId);
  
  if (!article) {
    return res.status(404).send('Статтю не знайдено');
  }
  res.render('article-detail', { title: article.title, article: article });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено: http://localhost:${PORT}`);
}); 