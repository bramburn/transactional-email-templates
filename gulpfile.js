var gulp = require('gulp'),
    inlineCss = require('gulp-inline-css');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
var uglify = require('gulp-uglify');

async function BuildSass() {
    console.log("Building Sass");

    return await gulp.src('./style.scss')
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./templates/'))

}

const browserSync = require('browser-sync').create();



function browser(cb) {
    browserSync.init({
        server: {
            baseDir: "./templates/"
        }
    });

    //WATCH FOR ANY CHANGES ON THE MAIN.SCSS  
    gulp.watch("./style.scss", BuildSass).on('change', browserSync.reload);
    gulp.watch('./templates/*.html').on('change', browserSync.reload);
    cb()
}



gulp.task('watch', browser);
gulp.task('buildsass', BuildSass);
gulp.task('default', function () {
    return gulp.src('./templates/*.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('build/'));
});


