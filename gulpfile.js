/* File: gulpfile.js */

// grab our packages
var gulp   = require('gulp'),
  jshint = require('gulp-jshint'),
	nodemon = require('gulp-nodemon'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	sourcemaps = require('gulp-sourcemaps'),
	concatCss = require('gulp-concat-css'),
	connect = require('gulp-connect'),
	mongobackup = require('mongobackup'),
	exec = require('child_process').exec;

function runCommand(command) {
	return function (cb) {
		exec(command, function (err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
		});
	}
}


// define the default task and add the watch task to it
gulp.task('default', ['start-mongo','play']);

gulp.task('install',  ['start-mongo','mongo-restore'])

gulp.task('play', ['start-mongo','start-app'])

gulp.task('start-mongo', runCommand('mongod --dbpath /data/db --port 27017'));
gulp.task('stop-mongo', runCommand('mongod --shutdown'));
gulp.task('start-app', runCommand('node server.js'));

gulp.task('mongo-restore', function() {
  mongobackup.restore({
    db : 'God',
    host : 'localhost',
    drop : true,
    path : './dump/God'
  });
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', ['jshint'], function() {
	gulp.watch('server.js', ['jshint']);
	gulp.watch('server/**/*.js', ['jshint']);
	gulp.watch('client/*.js', ['jshint', 'browserify']);
	gulp.watch('client/**/*.js', ['jshint', 'browserify']);
	gulp.watch('client/*.css', ['jshint', 'concatCss']);
	gulp.watch('public/templates/*.html');
});

// configure the jshint task
gulp.task('jshint', function() {
	return gulp.src(['server.js','server/**.*.js','client/*.js','client/**/*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('concatCss', function () {
  return gulp.src(['client/app.css', 'node_modules/angular-material/angular-material.css'])
    .pipe(concatCss("main.css"))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('browserify', function() {
	// Grabs the app.js file
	return browserify('./client/app.js')
		// bundles it and creates a file called main.js
		.bundle()
		.pipe(source('main.js'))
		// saves it the public/js/ directory
		.pipe(gulp.dest('./public/javascript/'));
})

gulp.task('connect', function() {
	connect.server({
		host: 'game.dev',
		port: 80,
		livereload: true
	});
});

gulp.task('dev', ['start-mongo','concatCss','browserify','watch'], function() {
	nodemon({
		script: 'server.js',
	})
    .on('restart', function () {
		console.log('*******')
    })
});
