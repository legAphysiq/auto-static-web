var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade');
    autoprefixer = require("gulp-autoprefixer"),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    markdown = require( "markdown" ).markdown,
    del = require('del');

gulp.task('styles',function(){
  gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 version'))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleancss())
    .pipe(gulp.dest('./dist/css'))
    .pipe(notify('Style task complete'))

})

gulp.task('scripts',function(){
  gulp.src('./src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js'))
    .pipe(notify('Scripts task complete'))
})

gulp.task('blog_view', function() {
  var YOUR_LOCALS = {};
  gulp.src('./views/blog/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./blog'))
    .pipe(notify("Blog task complete"))
});

gulp.task('site_view', function() {
  var YOUR_LOCALS = {};
  gulp.src('./views/site/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./site'))
    .pipe(notify("Site task complete"))
});

gulp.task('clean',function(){
  del(['./dist/*'])
  del(['./blog/*'])
  del(['./site/*'])
})

gulp.task('default',['clean'],function(){
  gulp.start('styles','scripts','blog_view','site_view');
})

gulp.task('watch',function(){
  gulp.watch('./src/sass/*.scss',['styles']);
  gulp.watch('./src/js/*.js',['scripts']);
  gulp.watch('./views/blog/*.jade',['blog_view']);
  gulp.watch('./views/site/*.jade',['site_view']);
})

