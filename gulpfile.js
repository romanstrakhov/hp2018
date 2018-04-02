var gulp = require('gulp');
var watch = require('gulp-watch');

var sass = require('gulp-sass');

var pug = require('gulp-pug');
var pugBeautify = require('gulp-pug-beautify');

var distPath = 'dist';

gulp.task( 'watch', function() {
    gulp.watch( 'scss/**/*.scss', ['styles'] );
    gulp.watch( 'views/**/*.scss', ['styles'] );  
} );

gulp.task( 'styles', function buildSCSS() {
    return gulp.src('scss/*')
    .pipe( sass() )
    .pipe( gulp.dest(distPath + '/css'));
} );

gulp.task( 'views', function buildHTML() {
  return gulp.src('views/**/*.pug')
    .pipe( pug({ pretty: true }))
    .pipe( pugBeautify({ omit_empty: true }) )
    .pipe( gulp.dest(distPath + '/'));        
  
} );


gulp.task( 'default', function() {
  
    return 0;
} );

