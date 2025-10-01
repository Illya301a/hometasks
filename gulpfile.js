const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');

// Шляхи до файлів
const paths = {
  scss: 'css/**/*.scss',
  css: 'css/',
  html: '*.html',
  js: 'js/**/*.js'
};

// Функція компіляції SCSS в CSS
function compileSCSS() {
  return src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded', // Розширений стиль для розробки
      precision: 6
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false,
      grid: true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.css))
    .pipe(browserSync.stream());
}

// Функція створення мінімізованої версії CSS
function minifyCSS() {
  return src(paths.css + 'style.css')
    .pipe(cleanCSS({
      level: 2,
      format: 'beautify'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest(paths.css));
}

// Функція для продакшн зборки
function buildCSS() {
  return src(paths.scss)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false,
      grid: true
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(rename('style.min.css'))
    .pipe(dest(paths.css));
}

// Функція запуску Browser Sync
function serve() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: 3000,
    notify: false
  });
}

// Функція відстеження змін
function watchFiles() {
  watch(paths.scss, series(compileSCSS, minifyCSS));
  watch(paths.html).on('change', browserSync.reload);
  watch(paths.js).on('change', browserSync.reload);
}

// Експорт завдань
exports.compile = compileSCSS;
exports.minify = minifyCSS;
exports.build = buildCSS;
exports.serve = serve;
exports.watch = watchFiles;
exports.dev = series(compileSCSS, minifyCSS, serve, watchFiles);
exports.default = series(compileSCSS, minifyCSS, serve, watchFiles);
