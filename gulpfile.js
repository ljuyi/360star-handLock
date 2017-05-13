var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
// CSS相关
var postcss = require('gulp-postcss');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var scss = require('postcss-scss');
var stripInlineComments = require('postcss-strip-inline-comments');

var browserSync = require('browser-sync'); // 自动刷新
var plumber = require('gulp-plumber'); // gulp 错误处理

var rename = require('gulp-rename'); // 文件重命名
var webpack = require('webpack')
var webpackConfig = require('./webpack.config.js');

gulp.task('webpack', function () {
    var myConfig = Object.create(webpackConfig)
    webpack(myConfig, function () {})
})
gulp.task('scss', function () {
    var postCssPlugins = [
        stripInlineComments,
        precss,
        autoprefixer({
            browsers: ['> 1%', 'IE > 8', 'Android >= 1.6', 'iOS >= 1.0']
        })
    ];

    function buildCss() {
        gulp.src('./front/src/common/scss/*.scss')
            .pipe(plumber())
            .pipe(postcss(postCssPlugins, {syntax: scss}))
            .pipe(rename(function (path) {
                path.extname = '.css';
            }))
            .pipe(cleanCSS())
            .pipe(gulp.dest('./front/dist/css'));
    }
    buildCss();
    gulp.watch('./front/src/common/scss/**', function () {
        buildCss();
    })
});


gulp.task('browserSync', function () {
    browserSync.init({
        port: 4000,
        server: {
            baseDir: './',
            index: 'index.html'
        }
    });

    browserSync.watch('./front/dist/css/*.css').on('change', browserSync.reload);
    browserSync.watch('./*.html').on('change', browserSync.reload)
    browserSync.watch('./front/dist/js/*.js').on('change', browserSync.reload);
});

gulp.watch('./front/src/common/js/*.js', ['webpack'])
gulp.task('default', ['browserSync', 'scss', 'webpack']);