'use strict';

var gulp = require('gulp');

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var es = require('event-stream');

var concat = require('gulp-concat');  
var rename = require('gulp-rename');
var babel = require('gulp-babel');

// var uglify = require('gulp-uglify'); 


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
javascripts.input.push('./node_modules/headjs/dist/1.0.0/head.js');
// javascripts.input.push('./vendor/micromodal/micromodal.js');
javascripts.input.push('./vendor/jquery.cookie.js');
javascripts.input.push('./vendor/purl.js');
javascripts.input.push('./vendor/selectwoo/dist/js/select2.full.js');
javascripts.input.push('./vendor/social_links.js');
javascripts.input.push('./src/js/components/**/*.js', './src/js/main.js')
javascripts.output = './js';

stylesheets.options = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  includePaths: ['node_modules']
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

// Compile sass into CSS
gulp.task('sass-dev', function() {

  var vendorFiles = gulp.src(stylesheets.concat);

  var localFiles = gulp.src('./src/scss/dev.scss')
    .pipe(sass(stylesheets.options).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions));

  return es.concat(vendorFiles, localFiles)
    .pipe(concat('dev.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(stylesheets.output));
});

// Compile sass into CSS
gulp.task('sass', function() {

  var vendorFiles = gulp.src(stylesheets.concat);

  var localFiles = gulp.src('./src/scss/main.scss')
    .pipe(sass(stylesheets.options).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions));

  return es.concat(vendorFiles, localFiles)
    .pipe(concat('201910/main.css'))
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

gulp.task('scripts', function() {
  return gulp.src(javascripts.input)
    .pipe(sourcemaps.init())
    .pipe(babel({
      babelrc: false,
      presets: presets_v6
      // exclude: [ 'node_modules/**' ]
    }))
    .pipe(concat('201910/utils.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(javascripts.output))
})

// gulp.task('scripts', function() {
//   return es.concat(
//     gulp.src(javascripts.vendor)
//       .pipe(sourcemaps.init()),
//     gulp.src(javascripts.input)
//       .pipe(sourcemaps.init())
//       .pipe(babel({
//         babelrc: false,
//         presets: presets_v6
//         // exclude: [ 'node_modules/**' ]
//       }))
//   )
//   .pipe(concat('utils.js'))
//   .pipe(sourcemaps.write())
//   .pipe(gulp.dest(javascripts.output))

// })

gulp.task('sass:watch', function () {
  gulp.watch(stylesheets.watch, gulp.parallel('sass', 'sass-dev'));
});

gulp.task('scripts:watch', function () {
  gulp.watch(javascripts.input, gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel('sass:watch', 'scripts:watch'));
gulp.task('run', gulp.series('sass', 'sass-dev', 'scripts'));