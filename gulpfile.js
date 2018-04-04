var gulp = require('gulp');
var watch = require('gulp-watch');
var changed = require('gulp-changed');
var imageMin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');

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


gulp.task( 'img-portfolio', function() {
  return gulp.src('images/portfolio/*.jpeg')
  .pipe( imageResize({ width:700 }) )
  .pipe( imageMin() )
  .pipe( gulp.dest( distPath + '/images/portfolio' ));
  
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

