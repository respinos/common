'use strict';

var gulp = require('gulp');

var sass = require('gulp-sass')(require('node-sass'));
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var es = require('event-stream');

var concat = require('gulp-concat');  
var rename = require('gulp-rename');
var babel = require('gulp-babel');

var uglify = require('gulp-uglify'); 


var stylesheets = {};
stylesheets.input = [ './vendor/**/*.css', './src/scss/main.scss', './src/scss/main.scss' ];
stylesheets.concat = [ './vendor/**/*.css' ];
stylesheets.watch = [ './vendor/**/*.css', './vendor/**/*.scss', './src/scss/**/*.scss' ];
stylesheets.output = './css';

var javascripts = {};
javascripts.input = [];
javascripts.vendor = [];
javascripts.input.push('./node_modules/jquery/dist/jquery.js');
javascripts.input.push('./node_modules/jquery.tabbable/jquery.tabbable.js');
javascripts.input.push('./node_modules/focus-visible/dist/focus-visible.js');

// // bootstrap dropdown dependencies
// @popperjs/core
// @dom/event-handler.js
// @dom/manipulator.js
// @dom/selector-engine.js
// base-compoentn.js
javascripts.input.push("node_modules/@popperjs/core/dist/umd/popper.min.js");

javascripts.input.push(
  "./node_modules/bootstrap/js/dist/dom/event-handler.js"
);
javascripts.input.push("./node_modules/bootstrap/js/dist/dom/data.js");
javascripts.input.push("./node_modules/bootstrap/js/dist/dom/manipulator.js");
javascripts.input.push(
  "./node_modules/bootstrap/js/dist/dom/selector-engine.js"
);
javascripts.input.push("./node_modules/bootstrap/js/dist/base-component.js");
javascripts.input.push("./node_modules/bootstrap/js/dist/dropdown.js");

javascripts.input.push('./vendor/jquery.cookie.js');
javascripts.input.push('./vendor/purl.js');
javascripts.input.push('./vendor/selectwoo/dist/js/select2.full.js');
javascripts.input.push('./vendor/social_links.js');
javascripts.input.push('./src/js/components/**/*.js');
javascripts.output = './js';

javascripts.main = [];
javascripts.main.push('./node_modules/headjs/dist/1.0.0/head.js');
javascripts.main.push('./src/js/main.js');

stylesheets.options = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  includePaths: ['node_modules']
};

var autoprefixerOptions = {
  grid: 'autoplace'
};

// Compile sass into CSS
gulp.task('sass', function() {

  var vendorFiles = gulp.src(stylesheets.concat);

  var localFiles = gulp.src('./src/scss/main.scss')
    .pipe(sass(stylesheets.options).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions));

  return es.concat(vendorFiles, localFiles)
    .pipe(concat('main.201910.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(stylesheets.output));
});

var presets_v7 =  [
        [
          '@babel/env',
          {
            targets: {
              edge: "17",
              firefox: "60",
              chrome: "67",
              safari: "11.1",
              ie: "11"
            },
          }
        ]
      ];

var presets_v6 = [ 'env' ];
var presets_v7 = [ '@babel/preset-env' ];

gulp.task('scripts-bundle', function() {
  return gulp
    .src(javascripts.input)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        babelrc: false,
        presets: presets_v7.map(require.resolve),
        plugins: ["@babel/plugin-proposal-object-rest-spread"],
        // exclude: [ 'node_modules/**' ]
      })
    )
    .pipe(concat("utils.bundle.js"))
    // .pipe(uglify())
    .pipe(sourcemaps.write("maps"))
    .pipe(gulp.dest(javascripts.output));
})

gulp.task('scripts', function() {
  return gulp
    .src(javascripts.main)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        babelrc: false,
        presets: presets_v7,
        plugins: ["@babel/plugin-proposal-object-rest-spread"],
        // exclude: [ 'node_modules/**' ]
      })
    )
    .pipe(concat("utils.201910.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("maps"))
    .pipe(gulp.dest(javascripts.output));
})

gulp.task('sass:watch', function () {
  gulp.watch(stylesheets.watch, gulp.parallel('sass'));
});

gulp.task('scripts:watch', function () {
  gulp.watch(javascripts.main, gulp.parallel('scripts'));
});

gulp.task('scripts-bundle:watch', function () {
  gulp.watch(javascripts.input, gulp.parallel('scripts-bundle'));
});

gulp.task('default', gulp.parallel('sass:watch', 'scripts:watch', 'scripts-bundle:watch'));
gulp.task('run', gulp.series('sass', 'scripts', 'scripts-bundle'));
