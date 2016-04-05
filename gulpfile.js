/**
 *
 * @authors excaliburhan (edwardhjp@gmail.com)
 * @date    2016-03-14 18:08:11
 * @version $Id$
 * gulpfile
 */

var
  path = require('path'),
  yargs = require('yargs').argv,
  gulp = require('gulp'),
  less = require('gulp-less'),
  autoprefixer = require('gulp-autoprefixer'),
  cssmin = require('gulp-clean-css'),
  jsmin  = require('gulp-jsmin'),
  imgmin = require('gulp-imagemin'),
  htmlmin = require('gulp-htmlmin'),
  browserSync = require('browser-sync'),
  option = {base: 'dev'},
  prod = path.resolve(__dirname, './prod');;

/**
 * CSS任务, less编译+私有前缀+压缩
 */
gulp.task('css', function () {
  gulp.src('dev/static/css/*.less', option)
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(cssmin())
    .pipe(gulp.dest(prod))
    .pipe(browserSync.reload({stream: true}));
});

/**
 * JS任务, 压缩
 */
gulp.task('js', function () {
  gulp.src('dev/static/js/vendors/*.js', option)
    .pipe(gulp.dest(prod));
  gulp.src('dev/static/js/!(vendors)/*.js', option)
    .pipe(jsmin())
    .pipe(gulp.dest(prod))
    .pipe(browserSync.reload({stream: true}));
});

/**
 * IMG任务, 图片压缩
 */
gulp.task('img', function () {
  gulp.src('dev/static/img/*.{jpg,png,svg,gif,jpeg}', option)
    .pipe(imgmin())
    .pipe(gulp.dest(prod));
});

/**
 * HTML任务, 压缩
 */ 
gulp.task('html', function() {
  gulp.src('dev/template/*.html', option)
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyJS: true,
      minifyCSS: true
    }))
    .pipe(gulp.dest(prod));
});

/**
 * Source任务
 */
gulp.task('source', function () {
  gulp.src('dev/static/source/**/*.*', option)
    .pipe(gulp.dest(prod));
});

// 任务
gulp.task('release', ['css', 'js', 'img', 'html', 'source']);

gulp.task('watch', function () {
  gulp.watch('dev/static/css/*.less', ['css']);
  gulp.watch('dev/static/img/*.{jpg,png,svg,gif,jpeg}', ['img']);
  gulp.watch('dev/static/source/**/*.*', ['source']);
  gulp.watch('dev/static/js/**/*.js', ['js'], function () {
    browserSync.reload();
  });
  gulp.watch('dev/template/*.html', ['html'], function () {
    browserSync.reload();
  });
});

gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: './prod'
    },
    ui: {
      port: 8082,
      weinre: {
        port: 8083
      }
    },
    port: 8081,
    startPath: '/template/popup.html'
  });
});


// 参数说明
//  -w: 实时监听
//  -s: 启动服务器
//  -p: 服务器启动端口，默认8081
gulp.task('default', function () {
  if ( yargs.s ) {
    gulp.start('server');
  }
  if ( yargs.w ) {
    gulp.start('release');
    gulp.start('watch');
  }
  else {
    gulp.start('release');
  }
});


