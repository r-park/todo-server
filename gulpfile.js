var gulp    = require('gulp'),
    eslint  = require('gulp-eslint'),
    mocha   = require('gulp-mocha'),
    nodemon = require('gulp-nodemon');


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

  test: 'test/**/*.js'
};


/*=========================================================
  CONFIG
---------------------------------------------------------*/
var config = {
  eslint: {
    src: paths.src.js
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
gulp.task('lint', function(){
  return gulp
    .src(config.eslint.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('server', function(done){
  nodemon(config.nodemon)
    .on('start', done);
});


gulp.task('test', function(){
  process.env.NODE_ENV = ENV_TEST;
  return gulp
    .src(paths.test, {read: false})
    .pipe(mocha(config.mocha))
    .on('error', function(error){
      console.log('has error');
    });
});


gulp.task('test.watch', gulp.series('test', function testWatch(){
  gulp.watch(paths.src.js.concat(paths.test), gulp.task('test'));
}));
