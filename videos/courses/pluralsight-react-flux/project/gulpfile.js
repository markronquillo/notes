"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // runs a local dev server
var open = require('gulp-open'); // open a url in a web browser
var browserify = require('browserify'); // bundles JS
var reactify = require('reactify'); // transforms react jsx to js
var source = require('vinyl-source-stream'); // use conventioal text streams with gulp
var concat = require('gulp-concat'); // concatenates files
var lint = require('gulp-eslint');


var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		images: './src/images/*',
		js: './src/**/*.js',
		mainJs: './src/main.js',
		css: [
			'./src/css/*.css',
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'node_modules/toastr/build/toastr.css',

		],
		dist: './dist',
	}
};

gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true,
	})
});


gulp.task('open', ['connect'], function() {
	// set dist/index.html as the source file
	gulp.src('dist/index.html')
		// open a webserver
		.pipe(open('', { 
			url: config.devBaseUrl + ':' + config.port + '/' 
		}))
});


gulp.task('html', function() {
	// get all html files
	gulp.src(config.paths.html)
		// copy them to dist folder
		.pipe(gulp.dest(config.paths.dist))

		// reload the page
		.pipe(connect.reload())
		;
});

gulp.task('images', function() {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
		.pipe(connect.reload())
		;
});

gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload())
		;
});

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'))
		;
});

gulp.task('lint', function() {
  return gulp.src(config.paths.js)
  .pipe(lint({config: 'eslint.config.json' }))
  .pipe(lint.format());
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint']);
});

// if we type 'gulp' in the command line
// gulp will run tasks, html, open, and watch 
gulp.task('default', ['html', 'images', 'js', 'css', 'lint', 'open', 'watch']);

