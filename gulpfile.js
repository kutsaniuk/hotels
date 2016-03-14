'use strict';

var src = { public: 'src/main/webapp/' }

var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    concat = require('gulp-concat'),
    wiredep = require('wiredep').stream;
 
gulp.task('default', ['watch'], function() {
  gulp.src(src.public)
    .pipe(webserver({
      directoryListing: false,
      open: false,
      fallback: 'index.html',
      host: 'localhost',
      port: 8000,
      path: '/',
      livereload: {
        enable: true
      }
    }));
});

gulp.task('sass', function () {
  return gulp.src(src.public + 'sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('src/main/webapp/dist/css'));
});
 
gulp.task('js', function() {
  return gulp.src(src.public + 'app/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest(src.public + 'dist/js/'));
});

gulp.task('watch', function () {
  gulp.watch(src.public + 'sass/*.sass', ['sass']);
  gulp.watch(src.public + 'app/**/*.js', ['js']);
  gulp.watch('bower.json', ['bower']);
});

gulp.task('bower', function () {
  gulp.src(src.public + 'index.html')
    .pipe(wiredep({
      directory: src.public + 'bower_components',
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest(src.public));
});