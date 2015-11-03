var coveralls = require('gulp-coveralls'),
    gulp      = require('gulp'),
    eslint    = require('gulp-eslint'),
    istanbul  = require('gulp-istanbul'),
    mocha     = require('gulp-mocha'),
    nodemon   = require('gulp-nodemon');


/*=========================================================
  ENV
---------------------------------------------------------*/
var ENV_DEVELOPMENT = 'development';
var ENV_PRODUCTION = 'production';
var ENV_TEST = 'test';

process.env.NODE_ENV = ENV_DEVELOPMENT;


/*=========================================================
  PATHS
---------------------------------------------------------*/
var paths = {
  src: {
    js: [
      'api/**/*.js',
      'core/**/*.js',
      'bootstrap.js',
      'index.js'
    ]
  },

  test: 'test/**/*.test.js'
};


/*=========================================================
  CONFIG
---------------------------------------------------------*/
var config = {
  coveralls: {
    src: 'tmp/coverage/**/lcov.info'
  },

  eslint: {
    src: paths.src.js
  },

  istanbul: {
    options: {
      includeUntested: false
    },
    reports: {
      dir: 'tmp/coverage',
      reporters: ['lcov']
    }
  },

  mocha: {
    reporter: 'spec'
  },

  nodemon: {
    script: 'bootstrap.js'
  }
};


/*=========================================================
  TASKS
---------------------------------------------------------*/
gulp.task('coveralls', function(){
  return gulp.src(config.coveralls.src)
    .pipe(coveralls())
});


gulp.task('lint', function(){
  return gulp.src(config.eslint.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('serve', function(done){
  nodemon(config.nodemon)
    .on('start', done);
});


gulp.task('test', function(){
  process.env.NODE_ENV = ENV_TEST;

  return gulp.src(paths.test, {read: false})
    .pipe(mocha(config.mocha))
    .on('error', function(error){
      console.log(error);
    });
});


gulp.task('test.cov', function(done){
  process.env.NODE_ENV = ENV_TEST;

  gulp.src(paths.src.js)
    .pipe(istanbul(config.istanbul.options))
    .pipe(istanbul.hookRequire())
    .on('finish', function(){
      gulp
        .src(paths.test, {read: false})
        .pipe(mocha(config.mocha))
        .pipe(istanbul.writeReports(config.istanbul.reports))
        .on('end', done);
    });
});


gulp.task('test.watch', gulp.series('test', function testWatch(){
  gulp.watch(paths.src.js.concat(paths.test), gulp.task('test'));
}));
