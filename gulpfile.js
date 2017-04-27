'use strict';

var path = require('path');

var gulp = require('gulp');
var gutil = require('gulp-util');
var debug = require('gulp-debug');
var browserify = require('browserify');
var stringify = require('stringify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gulpLoadPlugins = require('gulp-load-plugins');
var heyshopSass = require('heyshop-gulp-sass');

const $ = gulpLoadPlugins();


var browserifyBundle = function(b, path, name) {
  gutil.log('Build scripts: ' + name);
  return b.bundle()
    .on('error', function(err) {
      gutil.log(err.message);
      this.emit('end');
    })
    .pipe(source(name + '.min.js'))
    .pipe(buffer())
    .pipe(process.env.NODE_ENV === 'production' ? $.uglify() : gutil.noop())
    .pipe(gulp.dest(path))
    .pipe($.size({ title: `script ${name}` }));
};


var buildScript = function(path, name, watch) {
  var b = browserify({
    cache: {},
    packageCache: {},
    fullPaths: false,
    insertGlobals: true,
    debug: process.env.NODE_ENV !== 'production',
    transform: [
      stringify({
        extensions: ['.njk'],
        minify: false
      }),
      babelify.configure({
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
      })
    ]
  });
  if (watch) {
    b = watchify(b);
    b.on('update', function() {
      browserifyBundle(b, path, name);
    });
  }
  b.add(path + name + '.js');
  return browserifyBundle(b, path, name);
};


gulp.task('scripts-watch', function() {
  buildScript('theme/assets/javascripts/', 'theme', true);
});


gulp.task('scripts', function() {
  buildScript('theme/assets/javascripts/', 'theme', false);
});


gulp.task('styles-theme-njk', () => {
  return gulp.src([
      'theme/assets/stylesheets/*.scss.njk'
    ]).pipe($.sass({
      includePaths: heyshopSass.includePaths,
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.rename(function(path) {
      path.basename = path.basename.replace(/\.scss$/, '');
      path.extname = ".css.njk"
    }))
    .pipe(gulp.dest('theme/assets/stylesheets'))
    .pipe($.size({ title: 'theme styles' }));
});


gulp.task('styles-theme', () => {
  return gulp.src([
      'theme/assets/stylesheets/*.scss'
    ]).pipe($.sass({
      outputStyle: 'compressed',
      precision: 10
    }).on('error', $.sass.logError))
    .pipe(gulp.dest('theme/assets/stylesheets'))
    .pipe($.size({ title: 'theme styles' }))
});


gulp.task('dev', ['scripts-watch', 'styles-theme', 'styles-theme-njk'], function() {
  gulp.watch(['theme/assets/stylesheets/**/*.scss'], ['styles-theme', 'styles-theme-njk']);
  gulp.watch(['theme/assets/stylesheets/**/*.scss.njk'], ['styles-theme-njk']);
});

gulp.task('set-production-node-env', function() {
  return process.env.NODE_ENV = 'production';
});

gulp.task('default', ['set-production-node-env', 'scripts', 'styles-theme', 'styles-theme-njk']);
