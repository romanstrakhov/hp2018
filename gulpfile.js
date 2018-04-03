var gulp = require('gulp');
var watch = require('gulp-watch');

var wait = require('gulp-wait');
var waitD1 = 5000;

var sass = require('gulp-sass');

var pug = require('gulp-pug');
var pugBeautify = require('gulp-pug-beautify');

var distPath = 'dist';

gulp.task( 'watch', function() {
    gulp.watch( 'scss/**/*.scss', ['styles'] );
    gulp.watch( 'views/**/*.pug', ['views'] );
    gulp.watch( 'js/**/*.js', ['scripts'] );
//         console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
} );

gulp.task( 'styles', function buildSCSS() {
  return gulp.src('scss/*')
//     .pipe( wait( waitD1) )
    .pipe( sass() )
    .pipe( gulp.dest( distPath + '/css' ) );
} );

gulp.task( 'scripts', function buildJS() {
  return gulp.src( 'js/**/*.js' ) // Matches 'client/js/somedir/somefile.js' and resolves `base` to `js/`
//       .pipe(minify())
//     .pipe( wait( waitD1 ) )
    .pipe( gulp.dest(distPath + '/js') );
} );

gulp.task( 'views', function buildHTML() {
  return gulp.src( 'views/**/*.pug' )
//     .pipe( wait( waitD1 ) )
    .pipe( pug({ pretty: true }))
    .pipe( pugBeautify({ omit_empty: true }) )
    .pipe( gulp.dest(distPath + '/') );        
} );


gulp.task( 'default', ['views', 'styles', 'scripts'], function() {
  return 0;
} );

