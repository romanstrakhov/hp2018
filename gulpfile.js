var gulp = require('gulp');
var watch = require('gulp-watch');
var changed = require('gulp-changed');

var imageMin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');

var connect = require('gulp-connect');

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
    gulp.watch( 'images/portfolio/*.jpeg', ['img-portfolio'] );
//         console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
} );


gulp.task('connect', function () {
  connect.server({
    name: 'Dist App',
    root: 'dist',
    port: 8000,
    livereload: true
  });
});

gulp.task( 'img-portfolio', function() {
  return gulp.src('images/portfolio/*.jpeg')
    .pipe( imageResize({  // https://www.npmjs.com/package/gulp-image-resize
      width: 700,
      quality: 1,
      noProfile: true
      }) )
    .pipe( imageMin() )
    .pipe( gulp.dest( distPath + '/images/portfolio' ))
    .pipe( connect.reload() );
  
} );

gulp.task( 'styles', function buildSCSS() {
  return gulp.src('scss/*')
//     .pipe( wait( waitD1) )
    .pipe( sass() )
    .pipe( gulp.dest( distPath + '/css' ) )
    .pipe( connect.reload() );
} );

gulp.task( 'scripts', function buildJS() {
  return gulp.src( 'js/**/*.js' ) // Matches 'client/js/somedir/somefile.js' and resolves `base` to `js/`
//       .pipe(minify())
//     .pipe( wait( waitD1 ) )
    .pipe( gulp.dest(distPath + '/js') )
    .pipe( connect.reload() );
} );

gulp.task( 'views', function buildHTML() {
  return gulp.src( 'views/**/*.pug' )
//     .pipe( wait( waitD1 ) )
    .pipe( pug({ pretty: true }))
    .pipe( pugBeautify({ omit_empty: true }) )
    .pipe( gulp.dest(distPath + '/') )
    .pipe( connect.reload() );        
} );

gulp.task( 'build', ['views', 'styles', 'scripts'], function() {
  return 0;
} );

gulp.task( 'buildall', ['build', 'img-portfolio'], function() {
  return 0;
} );

gulp.task( 'default', ['views', 'styles', 'scripts'], function() {
  return 0;
} );

