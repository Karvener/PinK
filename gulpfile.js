var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber'); 
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var del = require('del');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var include = require("posthtml-include"); 

function styles() {
  return gulp.src('source/less/*.less')
              .pipe(plumber())
              .pipe(less())
              .pipe(postcss([
                autoprefixer()
              ])) 
              .pipe(gulp.dest('source/css'))
              .pipe(cleanCSS())
              // .pipe(rename('style.min.css'))    /* Когда Rename переименовывает файл, он становится пустым */
              .pipe(gulp.dest('dist/css'))
              .pipe(browserSync.stream());
}

function scripts() {
  return gulp.src('source/js/*.js')
              // .pipe(uglify())   /* Временно убрал */
              .pipe(gulp.dest('dist/js'))
              .pipe(browserSync.stream());
}

function html() {
  return gulp.src('source/*.html')
          .pipe(posthtml([
            include()
          ]))
          .pipe(gulp.dest('dist'))
          .pipe(browserSync.stream());
} 

function images() {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
              .pipe(imagemin([
                imagemin.optipng({optimizationLevel: 3}),
                imagemin.jpegtran({progressive: true}),
                imagemin.svgo()
                ]))
              .pipe(gulp.dest('source/img'));
}

function sprite() {
  return gulp.src('source/img/*.svg') 
              .pipe(svgstore({
                inlineSvg: true
                }))
              .pipe(rename('sprite.svg'))
              .pipe(gulp.dest('dist/img'));
}

function watch() {
  browserSync.init({
    server: {
        baseDir: "dist/"
    },
    tunnel: false
  });
  gulp.watch('source/less/*.less', styles);
  gulp.watch('source/js/*.js', scripts);
  gulp.watch('source/*.html', html);
  gulp.watch('dist/*.html', browserSync.reload());
}



function copy() {
  return gulp.src([
    'source/fonts/*',
    'source/img/**/*',
    'source/css/normalize.css'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('dist'));
}

function clean() {
  return del(['dist/*']);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('html', html);
gulp.task('images', images);
gulp.task('sprite', sprite);
gulp.task('copy', copy);
gulp.task('watch', watch);
gulp.task('clean', clean);
gulp.task('build', gulp.series(clean, sprite, copy, gulp.parallel(styles, scripts, html)));
gulp.task('dev', gulp.series('build', 'watch'));