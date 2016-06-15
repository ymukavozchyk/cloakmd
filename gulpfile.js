var nodemon;
var browserSync;
var gulp  = require('gulp');
var sass  = require('gulp-sass');


gulp.task('default', ['sass'], function () {
});

gulp.task('dev', ['browser-sync'], function () {
  gulp.watch('public/assets/styles/scss/**/*.scss', ['sass']);
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "localhost:9000",
    files: ["public/**/*.*"]
  });
});

gulp.task('nodemon', ['sass-dev'], function () {
  nodemon({
    script: 'dev-server.js',
    ignore: [ 'public/', 'node_modules/' ]
  });
});

gulp.task('sass-dev', function () {
  nodemon = require('gulp-nodemon');
  browserSync = require('browser-sync');

  return gulp.src('public/assets/styles/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/assets/styles/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('sass', function () {
  return gulp.src('public/assets/styles/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/assets/styles/css'));
});