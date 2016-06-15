var gulp        = require('gulp');
var browserSync = require('browser-sync');
var nodemon     = require('gulp-nodemon');


gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "localhost:9000",
    files: ["public/**/*.*"]
  });
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'dev-server.js',
    ignore: [ 'public/', 'node_modules/' ]
  });
});