const gulp = require('gulp');
const concat = require('gulp-concat');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');
const del = require('del');
const imagemin = require('gulp-imagemin');
const reload = browserSync.reload;

const $ = gulpLoadPlugins();

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('build', ['images'], () => {
  return gulp.src('dist/**/*').pipe($.size({
    title: '',
    gzip: true
  }));
});

gulp.task('images', () => {
  gulp.src(['assets/**/*.jpg', 'assets/**/*.png'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{
        removeUnknownsAndDefaults: false
      }, {
        cleanupIDs: false
      }]
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('serve', () => {
  
    browserSync.init({
      notify: false,
      port: 9000,
      server: {
        baseDir: "./"
      }
    });

    gulp.watch(["./*.html", "./js/**/*.js"]).on('change', browserSync.reload);
  
});
