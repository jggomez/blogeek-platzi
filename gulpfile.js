
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var htmlmin = require('gulp-htmlmin');
var minifyCSS = require('gulp-minify-css');

// Tareas para el desarrollo
// Get one .styl file and render 
gulp.task('stylus', function () {
  return gulp.src('app/stylus/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
    	stream : true
    }))
});

gulp.task('browserSync', () => {
	browserSync.init({
		server:{
			baseDir : 'public'
		}
	})
});

gulp.task('watch', ['browserSync', 'stylus'], () => {
	//gulp.watch('app/stylus/*.styl', ['stylus']);
	gulp.watch('public/*.html', browserSync.reload);
	gulp.watch('public/**/*.js', browserSync.reload);
});

gulp.task('default', (callback) => {
	runSequence(['browserSync', 'watch'],
		callback)
});

// 

// Tareas para el deploy

gulp.task('useref', () => {
	return gulp.src('app/**/*.html')
	.pipe(useref())
	.pipe(gulpIf('*.js', minify({mangle: false})))
	.pipe(gulpIf('*.css', minifyCSS()))
	.pipe(gulpIf('*.html', htmlmin({collapseWhitespace: true})))	
	.pipe(gulp.dest('dist'))
});

gulp.task('images', () => {
	return gulp.src('app/imagenes/**/*.+(png|jpg|gif|svg)')
	.pipe(cache(imagemin({
		interlaced : true
	})))
	.pipe(gulp.dest('dist/imagenes'))
});

gulp.task('fonts', () => {
	return gulp.src('app/fonts/**/*')	
	.pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean', () => {
	return del.sync('dist');
});

gulp.task('build', (callback) => {
	runSequence('clean', 'stylus'
		['useref', 'images', 'fonts'],
		callback)
});
