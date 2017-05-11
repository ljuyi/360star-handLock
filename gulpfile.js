var gulp = require('gulp');
var uglify = require('gulp-uglify');
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

gulp.task('scss', function () {
    var postCssPlugins = [
        stripInlineComments,
        precss,
        autoprefixer({
            browsers: ['> 1%', 'IE > 8', 'Android >= 1.6', 'iOS >= 1.0']
        })
    ];

    function buildCss() {
        gulp.src('./src/common/scss/*.scss')
            .pipe(plumber())
            .pipe(postcss(postCssPlugins, {syntax: scss}))
            .pipe(rename(function (path) {
                path.extname = '.css';
            }))
            .pipe(cleanCSS())
            .pipe(gulp.dest('./dist/css'));
    }
    buildCss();
    gulp.watch('./src/common/scss/*.scss', function () {
        buildCss();
    })
});


gulp.task('browserSync', function () {
    browserSync.init({
        port: 2333,
        server: {
            baseDir: './',
            index: 'index.html'
        }
    });

    browserSync.watch('./dist/css/*.css').on('change', browserSync.reload);
    browserSync.watch('./*.html').on('change', browserSync.reload)
});

gulp.task('default', ['browserSync', 'scss']);