var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');

gulp.task('server', function(){
	connect.server({
		livereload: true,
	});
});

gulp.task('build', function() {
	browserify({
		entries: './src/js/app.js',
		extensions: ['.js'],
		debug: true
	})
	.transform(babelify)
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('./dist'))
	.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('./src/js/*.js', ['build']);
});

gulp.task('default',['server','watch']);