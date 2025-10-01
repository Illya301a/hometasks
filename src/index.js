import './styles.css';

import Post from './post.js';
import { createStatistics } from './statistics.js';

import _ from 'lodash';

import jsonData from './assets/data.json';
import csvData from './assets/data.csv';
import xmlData from './assets/data.xml';

const post = new Post('Заголовок поста Webpack');
console.log('Пост у вигляді рядка:', post.toString());

document.getElementById('post-output').textContent = post.toString();

const statistics = createStatistics();

function updateClickCounter() {
  document.getElementById('click-counter').textContent = `Кліків: ${statistics.getClicks()}`;
}

document.addEventListener('click', updateClickCounter);

document.getElementById('destroy-stats').addEventListener('click', () => {
  const result = statistics.destroy();
  document.getElementById('click-counter').textContent = result;
});

document.getElementById('json-data').innerHTML = `
  <div class="data-display">
    <h3>JSON дані:</h3>
    <pre>${JSON.stringify(jsonData, null, 2)}</pre>
  </div>
`;

document.getElementById('csv-data').innerHTML = `
  <div class="data-display">
    <h3>CSV дані (перші 5 рядків):</h3>
    <pre>${csvData.slice(0, 5).join('\n')}</pre>
  </div>
`;

document.getElementById('xml-data').innerHTML = `
  <div class="data-display">
    <h3>XML дані:</h3>
    <pre>${JSON.stringify(xmlData, null, 2)}</pre>
  </div>
`;


console.log('Версія Lodash:', _.VERSION);
console.log('Приклад функції lodash - розбиття масиву:', _.chunk([1, 2, 3, 4, 5], 2));