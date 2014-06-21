'use strict';

var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	complexity = require('gulp-complexity'),
	jasmine = require('gulp-jasmine');

gulp.task('analysis', function(){
	return gulp.src('*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(complexity());
});

gulp.task('test', function(){
	return gulp.src('spec.js')
		.pipe(jasmine());
});

gulp.task('default', ['analysis', 'test']);
