const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task('babel', () => {
  gulp.src('src/conditional-field.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
});

gulp.task('compress', function() {
  return gulp.src('dist/conditional-field.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  return gulp.src('./docs/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./docs'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['babel', 'compress', 'sass'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch('src/**/*.js', ['babel', 'compress']);
  gulp.watch('docs/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['serve']);