var nodemon;
var browserSync;
var jshint;

var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('default', ['browser-sync'], function () {
  gulp.watch('public/assets/styles/scss/**/*.scss', ['build']);
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init(null, {
    proxy: "localhost:9000",
    files: ["public/**/*.*"]
  });
});

gulp.task('nodemon', ['sass-dev'], function () {
  nodemon({
    script: 'server.js',
    ignore: ['public/', 'node_modules/']
  });
});

gulp.task('sass-dev', function () {
  nodemon = require('gulp-nodemon');
  browserSync = require('browser-sync');

  return gulp.src('public/assets/styles/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/assets/styles/css/build'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('build', function () {
  return gulp.src('public/assets/styles/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/assets/styles/css/build'));
});

gulp.task('lint', function () {
  jshint = require('gulp-jshint');
  gulp.src('public/app/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
});