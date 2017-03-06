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

gulp.task('build', ['lint', 'clean', 'html', 'images'], () => {
  return gulp.src('dist/**/*').pipe($.size({
    title: '',
    gzip: true
  }));
});

gulp.task('wiredep', () => {
  gulp.src('sass/*.scss')
    .pipe($.filter(file => file.stat && file.stat.size))
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('sass'));

  gulp.src('./*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('images', () => {
  gulp.src('images/**/*.jpg')
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

function lint(files, options) {
  return gulp.src(files)
    .pipe($.eslint({
      fix: true
    }))
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
  return lint('./js/**/*.js')
    .pipe(gulp.dest('dev/js'));
});

gulp.task('html', ['stylesheets', 'javascript'], () => {
  return gulp.src(['./**/*.html', './dev/**/*.css', './dev/**/*.js', '!./node_modules/**/*', '!gulpfile.js'])
    .pipe($.useref({
      searchPath: ['.', 'dev']
    }))
    .pipe($.if('*.js', $.uglify().on('error', (e) => {
      console.log(e);
    })))
    .pipe($.if('*.css', $.cssnano({
      safe: true,
      autoprefixer: false
    })))
    .pipe($.if('*.html', $.htmlmin({
      collapseWhitespace: true
    })))
    .pipe(gulp.dest('dist/'))
});

gulp.task('stylesheets', () => {
  return gulp.src('sass/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    //.pipe(sassGlob())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dev/css'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('javascript', () => {
  return gulp.src('js/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dev/js'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('serve', () => {
  runSequence(['wiredep'], ['stylesheets', 'javascript'], () => {
    browserSync.init({
      notify: false,
      port: 9000,
      server: {}
    });

    gulp.watch([
      './**/*.html',
      './images/**/*',
    ]).on('change', reload);

    gulp.watch('./sass/**/*.scss', ['stylesheets']);
    gulp.watch('./js/**/*.js', ['javascript']);
  });
});
